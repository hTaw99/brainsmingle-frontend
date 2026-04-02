import type { Dictionary } from 'intlayer'
import { insert, t } from 'intlayer'

const appContent = {
  key: 'app',
  content: {
    seo: {
      home: {
        title: t({
          en: 'Home | BrainsMingle',
          ar: 'الرئيسية | برينز مينجل',
        }),
      },
    },
    pending: t({
      en: 'Loading...',
      ar: 'جاري التحميل...',
    }),

    brandTagline: t({
      en: 'Where meaningful connections, partnerships and friendships happen',
      ar: 'حيث تُبنى روابط ذات معنى، وشراكات وصداقات',
    }),
    nav: {
      login: t({ en: 'Login', ar: 'تسجيل الدخول' }),
      spaces: t({ en: 'Spaces', ar: 'المساحات' }),
      logout: t({ en: 'Logout', ar: 'تسجيل الخروج' }),
    },
    login: {
      cta: t({ en: 'Login', ar: 'تسجيل الدخول' }),
      pending: t({
        en: 'Logging in...',
        ar: 'جاري تسجيل الدخول...',
      }),
    },
    feed: {
      rooms: t({ en: 'Rooms', ar: 'الغرف' }),
      posts: t({ en: 'Posts', ar: 'المنشورات' }),
      notFound: t({
        en: insert('No {{name}} found'),
        ar: insert('لم يتم العثور على {{name}}'),
      }),
    },
    spaces: {
      title: t({ en: 'Spaces', ar: 'المساحات' }),
    },
    community: {
      title: t({ en: 'Community', ar: 'المجتمع' }),
    },
  },
} satisfies Dictionary

export default appContent
