import { Howl } from "howler";

//UI sounds

export const ClickSound = new Howl({
  src: ["/assets/audio/UI_Click.mp3"],
  volume: 0.65,
});

export const HoverSound = new Howl({
  src: ["/assets/audio/UI_Hover.mp3"],
});

//title page

export const BeginSound = new Howl({
  src: ["/assets/audio/Begin.mp3"],
  volume: 0.7,
});

export const MoveObstacle = new Howl({
  src: ["/assets/audio/Move_Obstacle_Looped.webm"],
  volume: 0,
  loop: true,
});

//dark matter found

export const DarkMatterFound = new Howl({
  src: ["/assets/audio/Scan_Found_1.mp3"],
  volume: 0.5,
});

//dark matter not found

export const NoDarkMatterFound = new Howl({
  src: ["/assets/audio/Scan_Not_Found_1.mp3"],
  volume: 0.3,
});

//obstacle mass
export const ObstacleMass = new Howl({
  src: ["/assets/audio/Obstacle_Mass_Looped.webm"],
  volume: 0,
  loop: true,
});

//interactive lens
export const InteractiveLens = new Howl({
  src: ["/assets/audio/Interactive_Lens.mp3"],
});

//stacked galaxies
export const StackedGalaxies = new Howl({
  src: ["/assets/audio/Stacked_Galaxies.webm"],
  volume: 0.08,
});

//end with surplus
export const EndWithSurplus = new Howl({
  src: ["/assets/audio/End_With_Surplus.webm"],
});

//end with deficit

export const EndWithDeficit = new Howl({
  src: ["/assets/audio/End_With_Deficit.webm"],
});

//looping ambience

export const TutorialAmbience = new Howl({
  src: ["/assets/audio/Ambient_1_XFade.webm"],
});

export const GameAmbience = new Howl({
  src: ["/assets/audio/Game_Ambient_XFade.webm"],
});
