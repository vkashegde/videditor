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
  }
];
