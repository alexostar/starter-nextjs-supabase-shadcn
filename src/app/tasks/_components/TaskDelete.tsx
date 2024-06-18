import { Button } from '@/components/ui/button'
import { removeTask } from '@/actions/tasks-actions'

export function TaskDelete({ taskId }: { taskId: number }) {
  return (
    <form action={removeTask}>
      <input type='hidden' name='taskId' value={taskId} />
      <Button variant='destructive'>Delete</Button>
    </form>
  )
}
