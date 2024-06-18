import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

import { createClient } from '@/supabase/clients/browserclient'

import { TaskCard } from './_components/TaskCard'
import { TaskForm } from './_components/TaskForm'

export const dynamic = 'force-dynamic'

export default async function TaskPage() {
  const supabase = createClient()
  const { data: tasks } = await supabase.from('tasks').select()

  return (
    <section className='py-24'>
      <div className='container'>
        <div className='grid grid-cols-3 gap-4 sm:grid-cols-1 lg:grid-cols-3'>
          {tasks?.map(task => <TaskCard task={task} key={task.id} />)}
        </div>
        <div className='mt-8'>
          <Link
            href='/tasks/new'
            className={buttonVariants({ variant: 'secondary' })}
          >
            Create Task
          </Link>
        </div>
      </div>
    </section>
  )
}
