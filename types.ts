export enum AppState {
  PROPOSAL = "PROPOSAL",
  ENVELOPE = "ENVELOPE",
  READING = "READING",
}

export interface ValentineData {
  recipientName: string;
  senderName: string;
  opening: string;
  message: string;
  coverImage?: string;
}

export interface TypewriterProps {
  text: string;
  speed?: number;
  startDelay?: number;
  onComplete?: () => void;
}
