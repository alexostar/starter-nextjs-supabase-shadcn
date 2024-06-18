import { TaskForm } from '../../_components/TaskForm'
import { createClient } from '@/supabase/clients/browserclient'
import { redirect } from 'next/navigation'

export default async function TaskPageEdit({
  params
}: {
  params: {
    id: string
  }
}) {
  const supabase = createClient()
  const { data: task, error } = await supabase
    .from('tasks')
    .select()
    .match({ id: parseInt(params.id) })
    .single()

  if (!task || error) {
    redirect('/')
  }

  return (
    <div className='flex justify-center pt-32 '>
      <TaskForm task={task} />
    </div>
  )
}
