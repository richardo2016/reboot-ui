import json from '../@data/data.json'

export const themes = json['theme-colors'].map(theme => theme.name)

export const sizes = [
    'lg',
    'sm'
]

export const TransitionTimeouts = {
    Fade:     150, // $transition-fade
    Collapse: 350, // $transition-collapse
    Modal:    300, // $modal-transition
    Carousel: 600, // $carousel-transition
};

export const headingTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']