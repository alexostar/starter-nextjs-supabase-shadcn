import { Task } from '@/types/collection'

import { Badge } from '@/components/ui/badge'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

import clsx from 'clsx'
import { TaskDelete } from './TaskDelete'
import Link from 'next/link'

/* Not needed anymore
export interface Task {
  id: number
  name: string
  description: string | null
  priority: string
  createdAt: string
  updatedAt: string
}
*/

export function TaskCard({ task }: { task: Task }) {
  return (
    <Card>
      <CardHeader className='flex flex-row justify-between'>
        <CardTitle>{task.name}</CardTitle>
        <Badge
          className={clsx({
            'bg-red-300 text-white': task.priority === 'high',
            'bg-yellow-300': task.priority === 'medium',
            'bg-green-300': task.priority === 'low',
            'bg-blue-300': task.priority === 'urgent'
          })}
        >
          {task.priority}
        </Badge>
      </CardHeader>
      <CardContent>
        <p>{task.description}</p>
        <span className='text-slate-600'>
          {new Date(task.createdAt).toLocaleDateString()}
        </span>
      </CardContent>
      <CardFooter className='flex justify-end gap-x-2'>
        <TaskDelete taskId={task.id} />
        <Link
          href={`/tasks/${task.id}/edit`}
          className={buttonVariants({ variant: 'secondary' })}
        >
          Edit
        </Link>
      </CardFooter>
    </Card>
  )
}
