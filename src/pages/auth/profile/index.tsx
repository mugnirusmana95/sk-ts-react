import Card from '~/components/card'
import Breadcrumb from '~/components/breadcrumb'

const ProfilePage = () => {

  return (
    <div className="flex w-full flex-col gap-5">
      <Breadcrumb
        title="Profile"
        subtitle="Subtitle Profile"
        data={
          [
            { title: 'Profile' }
          ]
        }
      />

      <Card>Profile Page</Card>
    </div>
  )
}

export default ProfilePage
