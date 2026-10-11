export default function Hero() {
  return (
    <section id="hero" className="scroll-mt-10 py-10">
      <div className="container">
        <div className="w-full">
          {/* Main Grid: 3 Columns */}
          <div className="grid h-full grid-cols-3 gap-1 lg:gap-2">
            {/* LEFT COLUMN: 2x2 Grid */}
            <div className="grid grid-cols-2 gap-1 lg:gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className={`bg-green-80 aspect-square rounded lg:rounded-lg`} />
              ))}
            </div>

            {/* CENTER COLUMN: Big Square with Custom Icon */}
            <div
              className={`bg-green-80 relative flex aspect-square items-center justify-center rounded lg:rounded-lg`}
            >
              {/* Custom Icon Construction */}
              <div className="grid rotate-45 grid-cols-2 gap-2 lg:gap-4">
                {/* Top-Left Petal (Points to Center) */}
                <div
                  className={`bg-dark-green-20 size-6 rounded-t-full rounded-l-full sm:size-12 lg:size-20`}
                ></div>

                {/* Top-Right Petal (Points to Center) */}
                <div
                  className={`bg-dark-green-20 size-6 rounded-t-full rounded-r-full sm:size-12 lg:size-20`}
                ></div>

                {/* Bottom-Left Petal (Points to Center) */}
                <div
                  className={`bg-dark-green-20 size-6 rounded-l-full rounded-b-full sm:size-12 lg:size-20`}
                ></div>

                {/* Bottom-Right Petal (Points to Center) */}
                <div
                  className={`bg-dark-green-20 size-6 rounded-r-full rounded-b-full sm:size-12 lg:size-20`}
                ></div>
              </div>
            </div>

            {/* RIGHT COLUMN: 2x2 Grid */}
            <div className="grid grid-cols-2 gap-1 lg:gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className={`bg-green-80 aspect-square rounded lg:rounded-lg`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
