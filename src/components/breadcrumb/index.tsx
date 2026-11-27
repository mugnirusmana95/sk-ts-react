import { useNavigate } from "react-router"

type TBreadcrum = {
  title: string,
  path?: string
}

const Breadcrumb = ({
  title,
  subtitle,
  data
}: {
  title?: string,
  subtitle?: string,
  data?: TBreadcrum[]
}) => {
  const navigate = useNavigate()
  return (
    <div className="w-full flex flex-col-reverse md:flex-row gap-5 md:gap-2 items-end md:items-center justify-end">
      <div className="w-full flex flex-col md:gap-1">
        {title && <span className="font-bold text-xl md:text-3xl">{title}</span>}
        {subtitle && <span className="italic text-sm">{subtitle}</span>}
      </div>
      <div className="hidden w-fit md:flex flex-row justify-center gap-2">
        {data && data.map((item, index) => (
          <div key={`breadcrumb-${index}`} className="w-fit flex flex-row gap-2 text-sm">
            <div
              className={`${item?.path ? 'cursor-pointer' : ''}`}
              onClick={() => {
                if (item?.path) {
                  navigate(item.path)
                }
              }}
            >
              {item.title}
            </div>
            {index === data?.length - 1 ? '' : '/'}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Breadcrumb