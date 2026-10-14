'use client'

import React, { useState, useEffect, useRef, useTransition } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from '@/components/ui/dialog'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { toast } from '@/components/ui/toast'
import { FieldError } from '@/components/ui/field'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  Camera01Icon,
  Mail01Icon,
  ShieldCheckIcon,
  TrashIcon,
  UserIcon,
  ViewIcon,
} from '@hugeicons/core-free-icons'
import { updateProfileAction } from '@/actions/auth.action'
import { notifyAuthChange } from '@/lib/auth-sync'
import type { User, Avatar as AvatarType } from '@/payload-types'
import Image from 'next/image'

// 👇 Nayi Server Action Import

const profileSchema = z.object({
  name: z.string().min(1, 'Required'),
  email: z.string().optional(),
  gender: z.string().min(1, 'Gender Required'),
  avatar: z.any().nullable().optional(),
})

// 👇 Ab component `user` as a prop accept karega
export default function ProfileForm({ user }: { user: User | null }) {
  const [isPending, startTransition] = useTransition() // 👈 Native loading state
  const [newAvatarPreview, setNewAvatarPreview] = useState<string | null>(null)
  const [isFullImageLoading, setIsFullImageLoading] = useState(true)
  const fullImgRef = useRef<HTMLImageElement>(null)

  // 👇 1. Profile Avatar Load track karne ke liye nayi state
  const [isAvatarLoading, setIsAvatarLoading] = useState(true)
  const avatarImgRef = useRef<HTMLImageElement>(null)

  const form = useForm({
    resolver: zodResolver(profileSchema),
    values: {
      name: user?.name || '',
      email: user?.email || '',
      gender: user?.gender || '',
      avatar: undefined,
    },
  })

  const { control, handleSubmit, setValue, trigger, reset, watch } = form
  const currentAvatarValue = watch('avatar')

  useEffect(() => {
    return () => {
      if (newAvatarPreview) {
        URL.revokeObjectURL(newAvatarPreview)
      }
    }
  }, [newAvatarPreview])

  const avatarObj =
    typeof user?.avatar === 'object' && user.avatar !== null ? (user.avatar as AvatarType) : null

  const displayAvatar =
    currentAvatarValue === null
      ? undefined // 👈 Agar custom avatar remove kiya, toh Google Avatar check karo
      : newAvatarPreview || avatarObj?.thumbnailURL || avatarObj?.url || undefined

  const fullSizeAvatar =
    currentAvatarValue === null
      ? undefined // 👈 Yahan bhi same
      : newAvatarPreview || avatarObj?.url || undefined

  const initials = user?.name
    ? user.name
        .trim()
        .split(/\s+/)
        .map((n: string) => n[0])
        .join('')
        .substring(0, 2)
        .toUpperCase()
    : 'U'

  const changeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target
    if (files && files.length > 0) {
      if (newAvatarPreview) {
        URL.revokeObjectURL(newAvatarPreview)
      }
      const newPreviewUrl = URL.createObjectURL(files[0])
      setNewAvatarPreview(newPreviewUrl)
      setValue('avatar', files[0], { shouldDirty: true })
      trigger('avatar')
    }
  }

  const handleRemoveAvatar = () => {
    if (newAvatarPreview) {
      URL.revokeObjectURL(newAvatarPreview)
      setNewAvatarPreview(null)
    }
    setValue('avatar', null, { shouldDirty: true })
    trigger('avatar')
  }

  // 👇 FormData ko Server Action par bhejenge
  const onSubmit = (data: z.infer<typeof profileSchema>) => {
    if (!user?.id) return toast.add({ type: 'error', title: 'User not found' })

    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('gender', data.gender)

    // Agar nayi file hai
    if (data.avatar instanceof File) {
      formData.append('avatar', data.avatar)
    } else if (data.avatar === null) {
      // Agar remove karni hai
      formData.append('removeAvatar', 'true')
    }

    startTransition(async () => {
      const result = await updateProfileAction(formData)

      if (result.success) {
        toast.add({
          type: 'success',
          title: 'Your personal information has been updated successfully.',
        })
        setValue('avatar', undefined)
        notifyAuthChange()
      } else {
        toast.add({
          type: 'error',
          title: result.error || 'Failed to update profile',
        })
      }
    })
  }

  const hasAvatarToRemove = (user?.avatar || newAvatarPreview) && currentAvatarValue !== null

  const inputWrapperClass = 'relative flex items-center'
  const inputIconClass = 'absolute left-4 text-muted-foreground w-5 h-5'
  const modernInputClass =
    'bg-green-95/50 border-green-80 focus-visible:ring-dark-green-20 focus-visible:border-dark-green-20 pl-12 h-14 rounded-xl text-base transition-all duration-300 w-full'
  const labelClass = 'text-sm font-bold text-foreground/80 ml-1'

  return (
    <section className="px-4 pt-6 pb-10 lg:pb-16">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center md:mb-10 md:text-left">
          <h1 className="text-dark-green-20 text-3xl font-black tracking-tight md:text-4xl">
            Account Settings
          </h1>
          <p className="text-muted-foreground mt-2 text-sm md:text-base">
            Manage your personal information and profile preferences.
          </p>
        </div>

        <div className="bg-card border-border/60 overflow-hidden rounded-3xl border shadow-sm">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="bg-green-97/50 border-border/40 flex flex-col items-center gap-6 border-b p-6 sm:flex-row sm:items-start md:gap-8 md:p-10">
              <input
                id="file"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={changeHandle}
                onClick={(e) => (e.currentTarget.value = '')}
              />

              <Dialog
                onOpenChange={(isOpen) => {
                  if (isOpen) {
                    if (!fullSizeAvatar) {
                      setIsFullImageLoading(false)
                    } else if (fullImgRef.current?.complete) {
                      setIsFullImageLoading(false)
                    } else {
                      setIsFullImageLoading(true)
                    }
                  }
                }}
              >
                <DialogTrigger>
                  <Avatar className="border-background bg-muted group relative h-28 w-28 shrink-0 cursor-pointer overflow-hidden rounded-full border-4 shadow-lg md:h-32 md:w-32">
                    {displayAvatar ? (
                      <>
                        {/* 👇 1. Skeleton with Glass Shine (Shimmer Effect) */}
                        {isAvatarLoading && (
                          <>
                            <style>{`
      @keyframes shimmer {
        100% { transform: translateX(100%); }
      }
    `}</style>
                            <div className="absolute inset-0 z-0 overflow-hidden bg-gray-200/80 dark:bg-gray-800">
                              <div
                                className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/80 to-transparent dark:via-white/20"
                                style={{ animation: 'shimmer 1.5s infinite' }}
                              />
                            </div>
                          </>
                        )}

                        <Image
                          ref={avatarImgRef}
                          src={displayAvatar}
                          alt={user?.name || 'User profile avatar'}
                          fill
                          priority
                          sizes="(max-width: 768px) 112px, 128px"
                          unoptimized
                          onLoad={() => setIsAvatarLoading(false)}
                          // 👇 2. Bug Fix: Yahan setIsAvatarLoading aayega
                          onError={() => setIsAvatarLoading(false)}
                          // 👇 3. Opacity logic hata diya aur z-10 lagaya taki image upar rahe
                          className="z-10 object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </>
                    ) : (
                      <AvatarFallback className="bg-transparent text-4xl">
                        {initials}
                      </AvatarFallback>
                    )}

                    {/* Hover Overlay - Yeh condition ke bahar rakha hai taaki Image aur Fallback dono par kaam kare */}
                    <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <HugeiconsIcon
                        icon={ViewIcon}
                        className="h-8 w-8 text-white/90 drop-shadow-md"
                      />
                    </div>
                  </Avatar>
                </DialogTrigger>

                <DialogContent className="flex w-fit max-w-[95vw] items-center justify-center rounded-md border-none bg-transparent p-0 shadow-none outline-none md:max-w-[95vw] [&>button]:hidden">
                  <DialogTitle className="sr-only">Profile Picture Preview</DialogTitle>

                  <div className="relative flex min-h-40 min-w-40 items-center justify-center overflow-hidden rounded-md bg-black/40">
                    {isFullImageLoading && fullSizeAvatar && (
                      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/80 backdrop-blur-xl">
                        <div className="border-t-green-70 h-12 w-12 animate-spin rounded-full border-4 border-white/10"></div>
                      </div>
                    )}

                    {fullSizeAvatar ? (
                      <img
                        ref={fullImgRef}
                        src={fullSizeAvatar}
                        alt="Full Preview"
                        referrerPolicy="no-referrer"
                        className={`h-auto max-h-[85vh] w-auto max-w-[95vw] object-contain transition-all duration-700 ease-out md:max-h-[95vh] md:max-w-[95vw]`}
                        onLoad={() => setIsFullImageLoading(false)}
                        onError={() => setIsFullImageLoading(false)}
                      />
                    ) : (
                      <div className="bg-dark-green-15 text-green-95 flex aspect-square w-[85vw] max-w-87.5 items-center justify-center text-[120px] font-bold shadow-inner md:max-w-100 md:text-[180px]">
                        {initials}
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>

              <div className="flex w-full flex-col items-center justify-center gap-3 pt-2 sm:items-start">
                <h2 className="text-foreground text-lg font-bold">Profile Picture</h2>
                <p className="text-muted-foreground mb-2 max-w-sm text-center text-sm sm:text-left">
                  Upload a new avatar. Click on the image to view it in full size.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                  <Label
                    htmlFor="file"
                    className="bg-dark-green-20 hover:bg-dark-green-25 text-green-95 flex cursor-pointer items-center justify-center gap-2 rounded-3xl px-6 py-2.5 text-sm font-semibold shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <HugeiconsIcon icon={Camera01Icon} className="h-4 w-4" />
                    Change Photo
                  </Label>

                  {hasAvatarToRemove && (
                    <button
                      type="button"
                      onClick={handleRemoveAvatar}
                      className="flex items-center gap-2 rounded-3xl bg-red-50 px-5 py-2.5 text-sm font-semibold text-red-500 transition-all hover:bg-red-100 hover:text-red-600"
                    >
                      <HugeiconsIcon icon={TrashIcon} className="h-4 w-4" />
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-8 p-6 md:space-y-10 md:p-10">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
                <div className="space-y-2.5">
                  <Label htmlFor="name" className={labelClass}>
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <div className={inputWrapperClass}>
                        <HugeiconsIcon icon={UserIcon} className={inputIconClass} />
                        <Input
                          {...field}
                          id="name"
                          required
                          placeholder="Enter your full name"
                          className={modernInputClass}
                        />
                      </div>
                    )}
                  />
                </div>

                <div className="space-y-2.5">
                  <Label htmlFor="email" className={labelClass}>
                    Email Address
                    <HugeiconsIcon
                      icon={ShieldCheckIcon}
                      className="text-dark-green-40 ml-1 inline h-4 w-4"
                    />
                  </Label>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <div className={inputWrapperClass}>
                        <HugeiconsIcon icon={Mail01Icon} className={inputIconClass} />
                        <Input
                          {...field}
                          id="email"
                          type="email"
                          disabled
                          placeholder="Enter your email"
                          className={`${modernInputClass} disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-50`}
                        />
                      </div>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <Label className={labelClass}>
                  Gender <span className="text-red-500">*</span>
                </Label>
                <Controller
                  name="gender"
                  control={control}
                  render={({ field, fieldState }) => (
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="grid grid-cols-1 gap-4 sm:grid-cols-3"
                    >
                      {['male', 'female', 'other'].map((option) => (
                        <Label
                          key={option}
                          htmlFor={option}
                          className={`relative flex cursor-pointer items-center justify-center rounded-xl border-2 p-4 transition-all duration-200 ${
                            field.value === option
                              ? 'border-dark-green-20 bg-green-95 text-dark-green-20 shadow-sm'
                              : 'border-border/50 hover:border-dark-green-40 hover:bg-green-97/50 text-foreground'
                          } `}
                        >
                          <RadioGroupItem
                            value={option}
                            id={option}
                            className="sr-only absolute right-4"
                          />
                          <span className="text-base font-semibold capitalize">{option}</span>
                        </Label>
                      ))}
                      {fieldState.invalid && (
                        <div className="col-span-full">
                          <FieldError errors={[fieldState.error]} />
                        </div>
                      )}
                    </RadioGroup>
                  )}
                />
              </div>
            </div>

            <div className="border-border/40 flex items-center justify-end border-t bg-gray-50/50 p-6 md:p-10">
              <Button
                type="submit"
                disabled={isPending} // 👈 isPending yahan laga diya
                className="bg-dark-green-20 hover:bg-dark-green-25 text-green-95 h-14 w-full rounded-4xl px-10 text-base font-bold shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl sm:w-auto"
              >
                {isPending ? 'Saving Changes...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
