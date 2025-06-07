<script lang="ts" setup>
const { state } = useQuery({
  key: ['comments'],
  query: () => $fetch('/api/comments')
})

const comment = ref({
  text: ''
})

const queryCache = useQueryCache()

const open = ref(false)
const { mutate: createComment, isLoading: isCreatingComment } = useMutation({
  mutation: () => $fetch('/api/comments', {
    method: 'POST',
    body: comment.value
  }),
  onSettled: () => {
    queryCache.invalidateQueries({ key: ['comments'] });
  },
  onSuccess: () => {
    comment.value.text = ''
    open.value = false
  }
})

const openWithAwait = ref(false)
const { mutate: createCommentWithAwait, isLoading: isCreatingCommentWithAwait } = useMutation({
  mutation: () => $fetch('/api/comments', {
    method: 'POST',
    body: comment.value
  }),
  onSettled: async (_, error) => {
    await queryCache.invalidateQueries({ key: ['comments'] });

    if (!error) {
      comment.value.text = ''
      openWithAwait.value = false
    }
  },
})
</script>

<template>
  <div class="p-8">
    <h1 class="text-2xl">Comments</h1>

    <p v-if="state.status === 'pending'">
      Loading comments...
    </p>

    <p v-else-if="state.status === 'error'">
      Error loading comments: {{ state.error.message }}
    </p>

    <p v-else-if="state.data.length === 0">
      No comments available.
    </p>

    <ul v-else>
      <li v-for="comment in state.data" :key="comment.text">
        {{ comment.text }}
      </li>
    </ul>

    <!-- <form class="mt-4" @submit.prevent="createComment()">
      <UFormField label="Comment" required>
        <UInput v-model="comment.text" placeholder="Your message..." class="w-full" />
      </UFormField>

      <UButton type="submit" label="Submit" :loading="isCreatingComment" class="mt-2" />
    </form> -->

    <div class="space-x-4 mt-8">
      <UModal v-model:open="open">
        <UButton label="Add Comment" />

        <template #body>
          <form class="mt-4" @submit.prevent="createComment()">
            <UFormField label="Comment" required>
              <UInput v-model="comment.text" placeholder="Your message..." class="w-full" />
            </UFormField>

            <UButton type="submit" label="Submit" :loading="isCreatingComment" class="mt-2" />
          </form>
        </template>
      </UModal>

      <UModal v-model:open="openWithAwait">
        <UButton label="Add Comment With Await" />

        <template #body>
          <form class="mt-4" @submit.prevent="createCommentWithAwait()">
            <UFormField label="Comment" required>
              <UInput v-model="comment.text" placeholder="Your message..." class="w-full" />
            </UFormField>

            <UButton type="submit" label="Submit" :loading="isCreatingCommentWithAwait" class="mt-2" />
          </form>
        </template>
      </UModal>
    </div>
  </div>
</template>
