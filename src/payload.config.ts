import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

// collections
import { Users } from './collections/users'
import { Avatars } from './collections/avatars'
import { Blogs } from './collections/blogs'
import { BlogImage } from './collections/blog-image'
import { Favorites } from './collections/favorites'
import { Bookmarks } from './collections/bookmarks'
import { Testimonials } from './collections/testimonials'
import { Team } from './collections/team'
import { TeamAvatar } from './collections/team-avatar'
import { TestimonialAvatar } from './collections/testimonial-avatar'
import { ContactSubmissions } from './collections/contact-submissions'
import { startUnverifiedUserCleanup } from './collections/users/cleanup'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const serverURL = process.env.NEXT_PUBLIC_APP_URL || `http://localhost:3000`

export default buildConfig({
  serverURL: serverURL,
  cors: [serverURL],
  csrf: [serverURL],

  routes: {
    admin: '/cms',
  },

  admin: {
    user: Users.slug,
    avatar: {
      Component: '@/components/cms/CustomAvatar#CustomAvatar',
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    dashboard: {
      widgets: [
        // 1. Ek chota widget sirf User Count ke liye
        // {
        //   slug: 'user-count',
        //   Component: '@/components/cms/widgets/UserCountWidget#UserCountWidget',
        //   minWidth: 'small',
        // },
        // // 2. Ek chota widget sirf Blogs Count ke liye
        // {
        //   slug: 'blog-count',
        //   Component: '@/components/cms/widgets/BlogCountWidget#BlogCountWidget',
        //   minWidth: 'small',
        // },

        // // 3. Ek chota widget sirf team Count ke liye
        // {
        //   slug: 'team-count',
        //   Component: '@/components/cms/widgets/TeamCountWidget#TeamCountWidget',
        //   minWidth: 'small',
        // },

        // // 4. Ek chota widget sirf testimonial Count ke liye
        // {
        //   slug: 'testimonials-count',
        //   Component: '@/components/cms/widgets/TestimonialsCountWidget#TestimonialsCountWidget',
        //   minWidth: 'small',
        // },

        {
          slug: 'stats-grid',
          Component: '@/components/cms/widgets/StatsGridWrapper#StatsGridWrapper',
          minWidth: 'full',
        },

        // 5. Engagement (Donut Chart) ke liye medium widget
        {
          slug: 'engagement-metrics',
          Component: '@/components/cms/widgets/EngagementWidget#EngagementWidget',
          minWidth: 'medium',
        },
        // 6. Growth Activity (Area Chart) ke liye bada widget
        {
          slug: 'growth-activity',
          Component: '@/components/cms/widgets/GrowthWidget#GrowthWidget',
          minWidth: 'medium',
          maxWidth: 'full',
        },
      ],
    },
    components: {
      beforeNavLinks: [
        '@/components/cms/VisitSiteButton#VisitSiteButton',
        '@/components/cms/DashboardLink#DashboardLink',
      ],
      logout: {
        Button: '@/components/cms/CustomLogout#CustomLogout',
      },
      graphics: {
        Logo: '@/components/cms/CustomLogo#CustomLogo',
        Icon: '@/components/cms/CustomIcon#CustomIcon',
      },
    },
  },
  onInit: async (payload) => {
    // ✅ Server start hote hi automatic background cleanup chalu ho jayega
    startUnverifiedUserCleanup(payload)
  },
  email: nodemailerAdapter({
    defaultFromAddress: process.env.SMTP_USER as string,
    defaultFromName: 'Nutritionist',
    transportOptions: {
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    },
  }),
  collections: [
    Users,
    Avatars,
    BlogImage,
    Blogs,
    Favorites,
    Bookmarks,
    Testimonials,
    TestimonialAvatar,
    Team,
    TeamAvatar,
    ContactSubmissions,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
  }),
  sharp,
  plugins: [
    vercelBlobStorage({
      enabled: true,
      collections: {
        avatars: {
          prefix: 'avatars',
        },
        'blog-image': {
          prefix: 'blog-image',
        },
        'team-avatar': {
          prefix: 'team-avatar',
        },
        'testimonial-avatar': {
          prefix: 'testimonial-avatar',
        },
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
})
