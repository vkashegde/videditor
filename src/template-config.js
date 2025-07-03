export const templates = [
  {
    id: "vacation_1",
    name: "My Vacation",
    duration: 20,
    scenes: [
      { id: "intro", type: "text", duration: 3, content: "Welcome to my vacation" },
      { id: "clip1", type: "video", duration: 5 },
      { id: "clip2", type: "video", duration: 7, transition: "fade" },
      { id: "outro", type: "text", duration: 4, content: "Thanks for watching!" }
    ]
  },
  {
    id: "tutorial_1",
    name: "Tutorial",
    duration: 15,
    scenes: [
      { id: "title", type: "text", duration: 2, content: "How To Tutorial" },
      { id: "step1", type: "video", duration: 4 },
      { id: "step2", type: "video", duration: 4 },
      { id: "step3", type: "video", duration: 4 },
      { id: "end", type: "text", duration: 1, content: "The End" }
    ]
  },
  {
    id: "presentation_1",
    name: "Presentation",
    duration: 30,
    scenes: [
      { id: "slide1", type: "text", duration: 5, content: "Introduction" },
      { id: "slide2", type: "text", duration: 5, content: "Main Points" },
      { id: "demo", type: "video", duration: 15 },
      { id: "slide3", type: "text", duration: 5, content: "Conclusion" }
    ]
  }
];
