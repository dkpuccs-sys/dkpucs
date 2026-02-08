const Story = () => {
  return (
    <div id="story" className="w-screen bg-card py-16 px-5 sm:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <p className="text-sm uppercase text-muted-foreground mb-4">
            Our College Community
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            A vibrant community of learners
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <img
            src="features.jpg"
            alt="Community"
            className="rounded-lg w-full h-96 object-cover"
          />

          <div>
            <p className="text-lg text-muted-foreground mb-8">
              Connect with fellow students, share knowledge, and grow together
              in our dynamic and supportive community.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Story;
