// data.js

// Profile data
const profileData = {
  name: "Hendri Sulistya",
  cvLink: "/assets/pdf/cv.pdf",
  imageSrc: "assets/images/hendri.png",
  company: {
    name: "Kewr Digital",
    url: "http://www.kewr-digital.com/",
  },
  researcher: {
    name: "Kewr Foundation",
    url: "http://www.kewr.org",
  },
  email: "hendrisulistya@yahoo.com",
  website: {
    url: "https://hendri.org",
    blogUrl: "https://blog.hendri.org",
  },
  social: {
    linkedin: "https://linkedin.com/in/hendrisulistya",
    github: "https://github.com/hendrisulistya",
    x: "https://x.com/hendrisulistya",
    eth: "https://etherscan.io/address/0x159f57909ab7d0Abe3467F36CB97B1798FA44000",
  },
  quote: '"Learn from mistake. Fight for future."',
};

const bookData = [
  {
    title: "Structure and Interpretation of Computer Programs",
    author: "Harold Abelson, Gerald Jay Sussman",
    description:
      "Structure and Interpretation of Computer Programs, a foundational text in computer science.",
    url: "https://www.example.com/book-1",
  },
  {
    title: "Madilog",
    author: "Tan Malaka",
    description:
      "A philosophical work discussing the dialectical materialism applied in the Indonesian revolution.",
    url: "https://www.example.com/book-2",
  },
  {
    title: "Naar der Republic",
    author: "Tan Malaka",
    description:
      "An influential piece advocating for Indonesian independence and republicanism.",
    url: "https://www.example.com/book-3",
  },
  {
    title: "Thus Spoke Zarathustra",
    author: "Friedrich Nietzsche",
    description:
      "A philosophical novel exploring ideas of individualism and existentialism.",
    url: "https://www.example.com/book-4",
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    description:
      "A practical guide to building good habits and breaking bad ones.",
    url: "https://www.example.com/book-5",
  },
  {
    title: "Psychology of Money",
    author: "Morgan Housel",
    description:
      "An exploration of how psychology affects financial decisions and money management.",
    url: "https://www.example.com/book-6",
  },
  {
    title: "The State and Revolution",
    author: "Vladimir Lenin",
    description:
      "A detailed theoretical text on Marxist theory and the role of revolution in creating a socialist state.",
    url: "https://www.example.com/book-7",
  },
  {
    title: "Wealth of Nations",
    author: "Adam Smith",
    description:
      "A classic economic text outlining the principles of capitalism and the invisible hand.",
    url: "https://www.example.com/book-8",
  },
];

const paperData = [
  {
    title: "Byzantine General Problem",
    author: "Leslie Lamport, Robert Shostak, Marshall Pease",
    description:
      "A foundational paper in distributed computing, discussing consensus in the presence of faulty or malicious actors.",
    url: "https://www.example.com/paper-1",
  },
  {
    title: "Advances in Distributed Security",
    author: "Whitfield Diffie, Martin E. Hellman",
    description:
      "A paper on the evolution of cryptographic techniques and security in distributed systems.",
    url: "https://www.example.com/paper-2",
  },
  {
    title: "Secrecy, Authentication, and Public Key Systems",
    author: "Ralph C. Merkle",
    description:
      "A seminal work discussing the development and usage of public key systems for secure communication.",
    url: "https://www.example.com/paper-3",
  },
  {
    title: "Secure Communications over Insecure Channels",
    author: "Ralph C. Merkle",
    description:
      "One of the pioneering papers that introduced the concept of public key cryptography for secure communication.",
    url: "https://www.example.com/paper-4",
  },
  {
    title: "Protocols for Public Key Cryptosystems",
    author: "Ralph C. Merkle",
    description:
      "A key paper on the development of public key cryptosystems and the RSA algorithm.",
    url: "https://www.example.com/paper-5",
  },
  {
    title: "The Art of Unix Programming",
    author: "Eric S. Raymond",
    description:
      "A philosophical and practical guide on Unix programming and its culture.",
    url: "https://www.example.com/paper-6",
  },
  {
    title: "Gnu Manifesto",
    author: "Richard Stallman",
    description:
      "The foundational document that launched the Free Software movement, advocating for software freedom.",
    url: "https://www.example.com/paper-7",
  },
  {
    title: "Hukum Revolusi",
    author: "Tan Malaka",
    description:
      "A work on revolutionary law and strategy, focusing on Indonesian independence.",
    url: "https://www.example.com/paper-8",
  },
];

const videoData = [
  {
    url: "https://www.youtube.com/watch?v=Yd9cf_vLviI",
    title:
      "Nick Bostrom: Humanity's biggest problems aren't what you think they are",
    author: "TEDx",
    description: "Description for Video 1",
  },
  {
    url: "https://www.youtube.com/watch?v=o8sAhDY6IyY&t=140s",
    title: "Gavin Wood - A Walkthrough of Polkadot's Governance",
    author: "Polkadot",
    description: "Description for Video 2",
  },
  {
    url: "https://www.youtube.com/watch?v=RoJkmxpOGis",
    title: "Ethereum: The World computer, featuring Dr. Gavin Wood",
    author: "IMWorld 2015",
    description: "Description for Video 3",
  },
  {
    url: "https://www.youtube.com/watch?v=h2pONw0eTTk",
    title: "Proof of Stake Panel Discussion - Silicon Valley Ethereum Meetup",
    author: "Decypher Media",
    description: "Description for Video 4",
  },
  {
    url: "https://www.youtube.com/watch?v=5QPyMfQBhOs&t=47s",
    title: "Jae Kwon -Cosmos Internet of Blockchains",
    author: "LinkTime",
    description: "Description for Video 5",
  },
];

const careerData = {
  proWork: [
    {
      date: "12/2012 – 3/2017",
      company: "Karya Zirang Utama PT",
      location: "Semarang, Indonesia",
      position: "Service Advisor",
      department: "Service Dept",
      description:
        "Provide exceptional customer service to automotive clients by effectively managing their vehicle service needs, ensuring their satisfaction throughout the entire process, and proactively preventing vehicle breakdowns.",
    },
    {
      date: "04/2017 – 10/2018",
      company: "Armada International Motor PT",
      location: "Magelang, Indonesia",
      position: "Mechanic",
      department: "Service Dept",
      description:
        "Diagnose, repair, and maintain automotive vehicles in a timely and efficient manner, following repair orders to ensure optimal performance, safety, and customer satisfaction.",
    },
    {
      date: "8/2019 – 6/2021",
      company: "Karya Zirang Utama PT",
      location: "Tasikmalaya, Indonesia",
      position: "Workshop Head",
      department: "Service Dept",
      description:
        "Oversee and manage the daily operations of an automotive repair and maintenance workshop, ensuring efficient workflow, quality workmanship, customer satisfaction, and the achievement of key performance indicators related to workshop sales and profitability.",
    },
    {
      date: "09/2021 – 7/2022",
      company: "Armada International Motor PT",
      location: "Yogyakarta, Indonesia",
      position: "Mechanic",
      department: "Service Dept",
      description:
        "Diagnose, repair, and maintain automotive vehicles in a timely and efficient manner, following repair orders to ensure optimal performance, safety, and customer satisfaction.",
    },
    {
      date: "2/2023 – Now",
      company: "Karya Digital Kewrindo",
      location: "Yogyakarta, Indonesia",
      position: "Software Engineer",
      department: "Technical",
      description:
        "Design, develop, test, and maintain high-quality software applications to meet business requirements and customer needs.",
    },
  ],
  informalWork: [
    {
      date: "9/2022 – Now",
      company: "Kewr Foundation",
      location: "Yogyakarta, Indonesia",
      position: "Researcher",
      department: "Product Development",
      description:
        "Conduct research and analysis to identify and evaluate new software technologies, market trends, and customer needs to support the development of innovative software products.",
    },
  ],
};
