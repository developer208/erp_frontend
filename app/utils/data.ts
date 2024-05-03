export type properties = {
  id: number;
  to: string;
  body: string;
  status: string;
};

export const obj: Array<properties> = [
  {
    id: 1,
    to: "vedang.mule@vit.edu.in",
    body: "welcome mail",
    status: "sent",
  },
  {
    id: 2,
    to: "shraddha.narvekar@vit.edu.in",
    body: "welcome mail",
    status: "sent",
  },
  {
    id: 3,
    to: "lokesh.bagul@gmail.com",
    body: "welcome mail",
    status: "sent",
  },
  {
    id: 4,
    to: "sarvesh.damle@vit.edu.in",
    body: "welcome mail",
    status: "sent",
  },
  {
    id: 5,
    to: "shivam.raina@vit.edu.in",
    body: "welcome mail",
    status: "sent",
  },
];


export const schemeArray:Array<{points:number,performance:string}>=[
  {
    points:10,
    performance:"Outstanding"
  },
  {
    points:9,
    performance:"Excellent"
  },
  {
    points:8,
    performance:"Very FGood"
  },
  {
    points:7,
    performance:"Good"
  },
  {
    points:6,
    performance:"Fair"
  },
  {
    points:5,
    performance:"Averagae"
  },
  {
    points:4,
    performance:"Pass"
  },
  {
    points:0,
    performance:"Fail"
  },
]
