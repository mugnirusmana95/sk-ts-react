const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-fit p-2 bg-white shadow rounded-md">{children}</div>
  )
}

export default Card