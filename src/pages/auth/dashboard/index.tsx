import { useLogout } from '~/features/auth/hook'

const DashboardPage = () => {
  const { mutate, isPending } = useLogout()

  const handleLogout = () => {
    mutate()
  }

  return (
    <div className="flex w-full flex-col gap-1">
      <span>Dashboard Page</span>
      <button
        type="button"
        className="w-fit rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        onClick={handleLogout}
      >
        {isPending ? 'Loading...' : 'Logout'}
      </button>
    </div>
  )
}

export default DashboardPage
