const resolvers = {
  Query: {
    tracksForHome: (_, __, { dataSources }) => {
      // console.log(_);
      return dataSources.trackAPI.getTracksForHome();
    },
    track: (_, { id }, { dataSources }) => {
      return dataSources.trackAPI.getTrack(id);
    },
    module: (_, { id }, { dataSources }) => {
      return dataSources.trackAPI.getModule(id);
    },
  },
  Mutation: {
    incrementTrackViews: async (_, { id }, { dataSources }) => {
      try {
        const track = await dataSources.trackAPI.incrementTrackViews(id);
        return {
          code: 200,
          success: true,
          message: `Successfully incremented number of views for track ${id}`,
          track,
        };
      } catch (err) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          track: null,
        };
      }
    },
  },
  Track: {
    author: ({ authorId }, _, { dataSources }) => {
      //console.log(authorId);
      return dataSources.trackAPI.getAuthor(authorId);
    },
    modules: (parent, _, { dataSources }) => {
      return dataSources.trackAPI.getTrackModules(parent.id);
    },
  },
};

module.exports = resolvers;
