import { BsCheck, BsChevronRight } from 'react-icons/bs';

import CourseImage1 from '../../assets/img/courses/course-1.png';
import CourseImage2 from '../../assets/img/courses/course-2.png';
import CourseImage3 from '../../assets/img/courses/course-3.png';

export const navigation = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'Classes',
    href: '/gradeBooking',
  },
  {
    name: 'Features',
    href: '/',
  },
  {
    name: 'Contact',
    href: 'contact',

  },
  {
    name: 'Blog',
    href: '/homeblog',
  },
];



export const facts = [
  {
    startNumber: '1',
    endNumber: '5',
    unit: '',
    title: 'Years of Experience',
    desc: 'We are 5 years of experienced in this yoga field. Giving the best instructions.',
  },
  {
    startNumber: '1',
    endNumber: '5',
    unit: 'K',
    title: 'Happy Clients',
    desc: 'We have over five thousand clients all over the world. They are very satisfied.',
  },
  {
    startNumber: '1',
    endNumber: '15',
    unit: '',
    title: 'Experienced Trainers',
    desc: 'We have over fifteen dedicated and experienced trainer for yoga and meditation.',
  },
  {
    startNumber: '1',
    endNumber: '24',
    unit: '',
    title: 'Monthly Classes',
    desc: 'Yoga is a physical, mental and spritual practice discipline. We provide 24+ classes monthly.',
  },
];

export const courses = [
  {
    image: CourseImage1,
    title: 'Basic Hatha Yoga Poses For Beginners',
    desc: 'This course is designed for beginners who want to learn about Hatha Yoga, a traditional style of Yoga that focuses on postures (asanas) and breath control (pranayama).',
    link: 'Get started',
    delay: '600',
  },
  {
    image: CourseImage2,
    title: 'Vinyasa Flow Yoga Intermediate Level',
    desc: 'This course is intended for individuals with experience in Vinyasa Yoga who want to further develop their techniques and abilities. It combines flowing movements and synchronized breathing.',
    link: 'Get started',
    delay: '800',
  },
  {
    image: CourseImage3,
    title: 'Yin Yoga for Relaxation and Stress Relief',
    desc: 'This course focuses on Yin Yoga, a gentle and slow-paced style of Yoga where postures are held for an extended period to relax the body and mind. It aims to reduce stress and create deep relaxation.',
    link: 'Get started',
    delay: '900',
  },
];

export const pricing = [
  {
    title: 'Basic Plan',
    price: '$10.',
    list: [
      {
        icon: <BsCheck />,
        name: 'Pay as you go',
      },
      {
        icon: <BsCheck />,
        name: 'Includes: Access to all weekly online Yoga sessions.',
      },
      {
        icon: <BsCheck />,
        name: 'Acces to all classes',
      },
    ],
    buttonText: 'Book now',
    buttonIcon: <BsChevronRight />,
    delay: '500',
  },
  {
    title: 'Standard Plan',
    price: '$20.',
    list: [
      {
        icon: <BsCheck />,
        name: 'Personalized notes from the instructor.',
      },
      {
        icon: <BsCheck />,
        name: 'Perfect for non-residence',
      },
      {
        icon: <BsCheck />,
        name: 'Acces to all classes',
      },
      {
        icon: <BsCheck />,
        name: 'Acces to all mentors',
      },
    ],
    buttonText: 'Book now',
    buttonIcon: <BsChevronRight />,
    delay: '600',
  },
  {
    title: 'Premium Plan:',
    price: '$35.',
    list: [

      {
        icon: <BsCheck />,
        name: 'Email, live chat, and phone support.',
      },
      {
        icon: <BsCheck />,
        name: 'Personalized notes from the instructor.',
      },
      {
        icon: <BsCheck />,
        name: 'Personalized nutrition consultation.',
      },


      {
        icon: <BsCheck />,
        name: ' Home workout exercises and videos.',
      },
    ],
    buttonText: 'Book now',
    buttonIcon: <BsChevronRight />,
    delay: '700',
  },
];
