import { WelcomePageView } from './welcome-page-view'

export default { title: 'Pages/Panel/WelcomePage' }

export const Default = () => {
  return <WelcomePageView submitting={false} onSubmit={() => {}} />
}
