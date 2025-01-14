import { Meta, StoryObj } from '@storybook/react'
import { Card } from './card'
import { CardImage, CardImageProps } from './card-image'
import { CardContent } from './card-content'
import { CardTitle, CardTitleProps } from './card-title'
import { CardSubtitle, CardSubtitleProps } from './card-subtitle'
import { CardDescription, CardDescriptionProps } from './card-description'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  subcomponents: {
    CardImage,
    CardContent,
    CardTitle,
    CardSubtitle,
    CardDescription,
  },
}

export default meta

type Story = StoryObj<typeof Card>

export const Default: Story = {
  args: {
    children: 'Default',
  },
}

type ComposedStory = StoryObj<{
  image: CardImageProps
  title: CardTitleProps
  subtitle: CardSubtitleProps
  description: CardDescriptionProps
}>

export const Composed: ComposedStory = {
  args: {
    image: {
      src: [
        'https://www.ikea.com/ca/en/images/products/klynnon-plant-pot-handmade-bamboo__1094412_pe863424_s5.jpg',
        'https://media.istockphoto.com/id/1372896722/photo/potted-banana-plant-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=bioeNAo7zEqALK6jvyGlxeP_Y7h6j0QjuWbwY4E_eP8=',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8VLxpwmL69BfoFxib7E4eUq6DG9JOBc8gtA&s',
      ],
    },
    title: {
      children: 'Hello world',
    },
    subtitle: {
      children: 'May 30, 1999',
    },
    description: {
      children: 'I was born on a sunny day on planet earth',
    },
  },
  render: (args) => (
    <Card onClick={() => {}}>
      <CardImage {...args.image} />
      <CardContent>
        <CardTitle {...args.title} />
        <CardSubtitle {...args.subtitle} />
        <CardDescription {...args.description} />
      </CardContent>
    </Card>
  ),
}
