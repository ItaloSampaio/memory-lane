import { CreateMemoryPageView } from './create-memory-page-view'

export default { title: 'Pages/Panel/CreateMemoryPage' }

export const Default = () => {
  return (
    <CreateMemoryPageView
      submitting={false}
      onSubmit={() => {}}
      onCancelClick={() => {}}
    />
  )
}
