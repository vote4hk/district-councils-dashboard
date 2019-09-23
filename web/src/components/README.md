# Guidelines

## Atmoic Design

References

- [http://atomicdesign.bradfrost.com/chapter-2/](http://atomicdesign.bradfrost.com/chapter-2/)
- [https://blog.usejournal.com/thinking-about-react-atomically-608c865d2262](https://blog.usejournal.com/thinking-about-react-atomically-608c865d2262)
- [https://medium.com/backticks-tildes/visually-breaking-down-ui-components-using-atomic-design-and-building-with-react-part-2-20eb8aabab4b](https://medium.com/backticks-tildes/visually-breaking-down-ui-components-using-atomic-design-and-building-with-react-part-2-20eb8aabab4b)

### Folder Structure

- atoms
  - smallest components
  - cannot be further break down into atoms
  - no margin, no paddings
- molecules
  - consists of atoms
  - no margin on the molecules
- organisms
  - consists of atoms and/or molecules
  - no margin on the organism
  - container should place here
    - may be as template/page
    - but for graphql container it contain a simple orginism
- templates
  - layout of a page
- pages
  - the page for the router
