export function DashboardSkeleton() {
  return (
    <div className="min-h-full w-full bg-[#F8FAFC] px-4 pb-8 pt-7 sm:px-6 sm:pt-8 lg:px-8">
      <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <div className="h-[2px] w-5 rounded-full bg-[#DCE5F8]" />
            <div className="h-3 w-[58px] animate-pulse rounded bg-[#E5EAF4]" />
          </div>

          <div className="h-7 w-[175px] animate-pulse rounded-[5px] bg-[#E2E8F2]" />
        </div>

        <div className="flex h-[32px] w-[204px] items-center gap-2 rounded-[9px] border border-[#E1E8F3] bg-[#F0F3FA] px-3">
          <div className="h-3 w-3 animate-pulse rounded-sm bg-[#DCE4F2]" />
          <div className="h-3 w-[155px] animate-pulse rounded bg-[#E1E7F1]" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex min-h-[192px] flex-col justify-between rounded-[14px] border border-[#E1E8F3] bg-white p-5 shadow-[0_2px_9px_rgba(24,34,56,0.035)] sm:p-6"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-[7px]">
                <div className="h-[13px] w-[78px] animate-pulse rounded bg-[#E3E9F2]" />
                <div className="h-[2px] w-6 rounded-full bg-[#E8EDF5]" />
              </div>

              <div className="h-[39px] w-[39px] animate-pulse rounded-[10px] border border-[#EEF2FF] bg-[#F0F3FA]" />
            </div>

            <div className="mt-7">
              <div className="flex items-baseline gap-2">
                <div className="h-[37px] w-[60px] animate-pulse rounded-[5px] bg-[#E2E8F2]" />
                <div className="h-[11px] w-[25px] animate-pulse rounded bg-[#EDF0F5]" />
              </div>

              <div className="mt-[10px] h-[10px] w-[126px] animate-pulse rounded bg-[#EDF0F5]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
