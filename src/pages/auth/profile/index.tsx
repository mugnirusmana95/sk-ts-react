import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useGetProfile } from '~/features/profile/hook'

const ProfilePage = () => {
  const { data, isPending } = useGetProfile()
  const navigate = useNavigate()

  const handleToDashbaord = () => {
    navigate('/dashboard')
  }

  useEffect(() => {
    console.log('data ', data)
  }, [data])

  return (
    <div className="flex w-full flex-col gap-1">
      <span>Dashboard Page</span>

      {isPending && <span>Loading...</span>}

      <button
        type="button"
        className="w-fit rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        onClick={handleToDashbaord}
      >
        Go To Dashbaord
      </button>
    </div>
  )
}

export default ProfilePage
