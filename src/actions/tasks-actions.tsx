'use server'

import { createClient } from '@/supabase/clients/server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createTask(formData: FormData) {
  const supabase = createClient()
  const name = formData.get('name')?.toString()
  const description = formData.get('description')?.toString()
  const priority = formData.get('priority')?.toString()

  if (!name || !description || !priority) {
    return
  }

  const { data, error } = await supabase
    .from('tasks')
    .insert([{ name: name, description: description, priority: priority }])
    .select()

  revalidatePath('/tasks')
  redirect('/tasks')
}

export async function removeTask(formData: FormData) {
  const supabase = createClient()
  const taskId = formData.get('taskId')?.toString()

  if (!taskId) {
    return
  }

  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', parseInt(taskId))

  revalidatePath('/tasks')
  redirect('/tasks')
}

export async function updateTask(formData: FormData) {
  const supabase = createClient()
  const id = formData.get('id')?.toString()
  const name = formData.get('name')?.toString()
  const description = formData.get('description')?.toString()
  const priority = formData.get('priority')?.toString()

  if (!id || !name || !description || !priority) {
    return
  }

  const { data, error } = await supabase
    .from('tasks')
    .update({ name: name, description: description, priority: priority })
    .eq('id', parseInt(id))
    .select()

  revalidatePath('/tasks')
  redirect('/tasks')
}
