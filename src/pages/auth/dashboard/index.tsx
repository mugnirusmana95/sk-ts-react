import { useState } from 'react'

import Card from '~/components/card'
import Breadcrumb from '~/components/breadcrumb'
import Table from '~/components/table'

type TUser = { id: number; name: string; profile: { email: string } }

const DashboardPage = () => {
  const [checkedList, setCheckedList] = useState<string[]>([])

  return (
    <div className="flex w-full flex-col gap-5">
      <Breadcrumb
        title="Dashboard"
        subtitle="Subtitle Dashboard"
        data={
          [
            { title: 'Dashboard' }
          ]
        }
      />

      <Card>
        <div className="w-full flex flex-col">
          <Table<TUser>
            withIncrement
            withCheckbox
            withFooter
            checkedData={{
              uniqueKey: 'id',
              list: checkedList
            }}
            data={[
              { id: 1, name: 'Ade Mugni Rusmana', profile: { email: 'mugnirusmana95@gmail.com' } }
            ]}
            columns={[
              {
                id: 'name',
                header: 'Nama',
                value: 'name',
              },
              {
                id: 'email',
                header: 'Email',
                value: 'profile.email',
                customRender: (val) => <a href={`mailto:${val}`}>{val}</a>,
              }
            ]}
            actionColumn={(item) => {
              return (
                <>
                  <a href="#" id={String(item.id)}>View</a>
                  <a href="#" id={String(item.id)}>Update</a>
                  <a href="#" id={String(item.id)}>Delete</a>
                </>
              )
            }}
            pagination={{
              page: 1,
              limit: 10,
              totalData: 1000,
              totalPage: 100,
              hasPrevPage: false,
              hasNextPage: true
            }}
            onPageChange={(page) => console.log(page)}
            onChecked={(rows, checked) => {
              const ids = rows.map((r) => String(r.id))
              setCheckedList((prev) =>
                checked
                  ? Array.from(new Set([...prev, ...ids]))
                  : prev.filter((id) => !ids.includes(id))
              )
            }}
          />
        </div>
      </Card>
    </div>
  )
}

export default DashboardPage
