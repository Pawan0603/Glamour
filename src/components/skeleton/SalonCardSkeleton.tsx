import React from 'react'

function SalonCardSkeleton() {
  return (
    <div className="bg-card rounded-2xl overflow-hidden shadow-card h-full flex flex-col animate-pulse">

      {/* Cover image */}
      <div className="relative h-40 sm:h-44 md:h-48 bg-muted">
        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <div className="h-5 w-16 bg-muted-foreground/20 rounded-full" />
        </div>
        {/* Rating badge */}
        <div className="absolute top-3 right-3">
          <div className="h-5 w-12 bg-muted-foreground/20 rounded-full" />
        </div>
      </div>

      <div className="p-4 md:p-5 flex-1 flex flex-col">

        {/* Title + Open/Closed badge */}
        <div className="flex justify-between items-center mb-1">
          <div className="h-5 w-2/5 bg-muted rounded-md" />
          <div className="h-6 w-20 bg-muted rounded-full" />
        </div>

        {/* Location + Hours */}
        <div className="flex items-center justify-between mb-2 md:mb-3">
          <div className="h-4 w-1/3 bg-muted rounded-md" />
          <div className="h-4 w-1/4 bg-muted rounded-md" />
        </div>

        {/* Service tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="h-7 w-16 bg-muted rounded-full" />
          <div className="h-7 w-20 bg-muted rounded-full" />
          <div className="h-7 w-14 bg-muted rounded-full" />
        </div>

        {/* Book now button */}
        <div className="h-10 w-full bg-muted rounded-xl mt-auto" />
      </div>
    </div>
  )
}

export default SalonCardSkeleton