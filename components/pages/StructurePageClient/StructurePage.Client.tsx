'use client';

import css from './StructurePageClient.module.css';

// type Page = Record<string, string[]>;

// const pages = {
//   StructurePageClient: [],
//   HomePageClient: [],
//   StoriesPageClient: [],
//   StoryPageClient: [],
//   AddStoryPage: [],
//   EditStoryPage: [],
//   TravellersPageClient: [],
//   TravellerPageClient: [],
//   ProfilePageClient: [],
//   AuthPage: [],
// };

// const pages2 = {
//   StructurePageClient: {
//     route: '/structure',
//   },
//   HomePageClient: {
//     route: '/',
//   },
//   StoriesPageClient: {
//     route: '/stories',
//   },
//   StoryPageClient: {
//     route: '/stories/[storyId]',
//   },
//   AddStoryPage: {
//     route: '/stories/create',
//   },
//   EditStoryPage: {
//     route: '/stories/[storyId]/edit',
//   },
//   TravellersPageClient: {
//     route: '/travellers',
//   },
//   TravellerPageClient: {
//     route: '/travellers/[travellerId]',
//   },
//   ProfilePageClient: {
//     route: '/profile',
//   },
//   AuthPage: {
//     route: '/auth/[authType]',
//   },
// };

interface Component {
  componentName: string;
  innerComponents?: Component[];
}
interface Route {
  route: string;
  pageName: string;
  innerPages?: Route[];
  components?: Component[];
}

export default function StructurePageClient() {
  const routes: Route[] = [
    //! StructurePageClient
    {
      pageName: 'StructurePageClient',
      route: '/structure',
      components: [],
      innerPages: [],
    },
    //! HomePageClient
    {
      pageName: 'HomePageClient',
      route: '/',
      components: [
        { componentName: 'Hero' },
        { componentName: 'About' },
        { componentName: 'PopularStoriesSection' },
        { componentName: 'OurTravellers' },
        { componentName: 'Join' },
      ],
      innerPages: [],
    },
    //!StoriesPageClient
    {
      pageName: 'StoriesPageClient',
      route: '/stories',
      components: [
        { componentName: 'TravellersStories(common)' },
        { componentName: 'LoadMoreButton' },
      ],
      innerPages: [
        {
          pageName: 'StoryPageClient',
          route: '/stories/[storyId]',
          components: [
            { componentName: 'StoryDetails' },
            { componentName: 'PopularStories(common)' },
          ],
          innerPages: [
            {
              pageName: 'EditStoryPageClient',
              route: '/stories/[storyId]/edit',
              components: [{ componentName: 'AddStoryForm(common)' }],
              innerPages: [],
            },
          ],
        },
        {
          pageName: 'AddStoryPageClient',
          route: '/stories/create',
          innerPages: [],
          components: [
            {
              componentName: 'AddStoryForm(common)',
              innerComponents: [],
            },
          ],
        },
      ],
    },
    //!TravellersPageClient
    {
      pageName: 'TravellersPageClient',
      route: '/travellers',
      components: [{ componentName: 'TravellersList(common)' }],
      innerPages: [
        {
          pageName: 'TravellerPageClient',
          route: '/travellers/[travellerId]',
          components: [
            { componentName: 'TravellerInfo(common)' },
            { componentName: 'TravellersStories(common)' },
            { componentName: 'MessageNoStories(common)' },
          ],
          innerPages: [],
        },
      ],
    },
    //!ProfilePageClient
    {
      pageName: 'ProfilePageClient:',
      route: '/profile',
      components: [
        { componentName: 'TravellerInfo(common)' },
        { componentName: 'PageToggle' },
      ],
      innerPages: [
        {
          pageName: 'SavedStoriesPageClient',
          route: '/profile/saved',
          components: [{ componentName: 'TravellersStories(common)' }],
          innerPages: [],
        },

        {
          pageName: 'OwnStoriesPageClient',
          route: '/profile/own',
          components: [{ componentName: 'TravellersStories(common)' }],
          innerPages: [],
        },
      ],
    },
    //!AuthPageClient
    {
      pageName: ' AuthPageClient: ',
      route: '/auth/[authType]',
      innerPages: [],
      components: [
        { componentName: 'RegistrationForm' },
        { componentName: 'LoginForm(common)' },
      ],
    },
  ];

  const commonComponents = [
    'Header',
    'AuthHeader',
    'PopularStories',
    'TravellersStories',
    'TravellersStoriesItem',
    'TravellersList',
    'TravellerInfo',
    'MessageNoStories',
    'AuthFooter',
    'Footer',
  ];

  const drawComponentList = (components: Component[]) => {
    return (
      <div className={css.componentsContainer}>
        <h3>Components:</h3>
        <ul className={css.componentList}>
          {components.map(({ componentName, innerComponents }) => (
            <li key={componentName} className={css.componentItem}>
              <h6 className={css.componentName}>{`${componentName}`}</h6>
              {innerComponents &&
                innerComponents.length > 0 &&
                drawComponentList(innerComponents)}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const drawRouteList = (routes: Route[]) => {
    return (
      <div className={css.routesContainer}>
        <ul className={css.routeList}>
          {routes.map(({ route, pageName, components, innerPages }) => (
            <li className={css.routeItem} key={route}>
              <h3 className={css.routeHeading}>{`(${route}:)`}</h3>
              <h2 className={css.routePageName}>{pageName}</h2>

              {components && components?.length > 0 && (
                <>{drawComponentList(components)}</>
              )}
              {innerPages && innerPages.length > 0 && (
                <div>
                  <h3>InnerRoutes:</h3>
                  <div className={css.innerRoutesContainer}>
                    {drawRouteList(innerPages)}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const markup = drawRouteList(routes);

  return (
    <div className={css.container}>
      <h1 style={{ color: 'red' }}>StructurePageClient</h1>
      {markup}
    </div>
  );
}
