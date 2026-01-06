import React from 'react';
import AboutCardPersonal from './AboutCardPersonal';
import AboutCardEducation from './AboutCardEducation';
import SectionTitle from '../Common/SectionTitle';
import NumbersCard from './NumbersCard';
import { ArticleIcon } from '../../icons/article';

const AboutSection: React.FC = () => {
  const numbersData = [
    {
      title: 'المقالات المنشورة',
      number: '22 مقالة',
      icon: <ArticleIcon />

    },
    {
      title: 'المقالات المنشورة',
      number: '22 مقالة',
      icon: <ArticleIcon />

    },
    {
      title: 'المقالات المنشورة',
      number: '22 مقالة',
      icon: <ArticleIcon />

    },
    {
      title: 'المقالات المنشورة',
      number: '22 مقالة',
      icon: <ArticleIcon />

    },
    {
      title: 'المقالات المنشورة',
      number: '22 مقالة',
      icon: <ArticleIcon />

    },
    {
      title: 'المقالات المنشورة',
      number: '22 مقالة',
      icon: <ArticleIcon />

    },
    {
      title: 'المقالات المنشورة',
      number: '22 مقالة',
      icon: <ArticleIcon />

    },
    {
      title: 'المقالات المنشورة',
      number: '22 مقالة',
      icon: <ArticleIcon />

    },

  ]
  return (
    <section className="relative py-12 md:py-16 bg-[#F5F5F5] overflow-hidden font-Expo">
      <div className="relative z-10">
          <SectionTitle title="عن الدكتور" />
        <div className="mx-auto container space-y-[40px]">
          <AboutCardPersonal />
          <AboutCardEducation />
        </div>
        <div className="flex justify-center items-center my-10 px-4">
          <SectionTitle title="الأرقام تتحدث" />
        </div>
        <div className="mx-auto container grid grid-cols-4 gap-4">
          {numbersData.map(item => {
            return (
              <NumbersCard item={item} />
            )
          })

          }
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 w-full h-[300px] md:h-[400px] opacity-50 pointer-events-none z-0"
        style={{
          backgroundImage: `url(/images/arabic-pattern-faded.svg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'bottom center',
          backgroundRepeat: 'no-repeat'
        }}
      ></div>
    </section>
  );
};

export default AboutSection;