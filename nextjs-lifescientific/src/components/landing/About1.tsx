import { CircleArrowRight, Files, Settings } from "lucide-react";

const About1 = () => {
  return (
    <section className="py-24 bg-muted/5">
      <div className="container max-w-[80%] mx-auto space-y-32">
        <div className="flex flex-col gap-8">
          <h2 className="text-4xl font-medium lg:text-7xl xl:text-8xl max-w-4xl">
            Bringing the power of science to everyone
          </h2>
          <p className="max-w-2xl text-xl text-muted-foreground leading-relaxed">
            Life Scientific makes it easy to access high-quality agricultural solutions.
            Our innovative approach delivers trusted products to farmers worldwide.
          </p>
        </div>

        <div className="grid gap-16 md:grid-cols-2">
          <div className="group relative overflow-hidden rounded-2xl w-[85%] aspect-[4/3]">
            <img
              src="https://shadcnblocks.com/images/block/placeholder-1.svg"
              alt="placeholder"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 z-10 flex items-end p-8 bg-gradient-to-t from-black/60 to-transparent">
              <p className="text-xl font-medium text-white drop-shadow-md">
                Innovative solutions for modern agriculture
              </p>
            </div>
          </div>
          
          <div className="flex flex-col justify-center gap-8">
            <p className="text-sm font-medium text-primary tracking-wide uppercase">Our Mission</p>
            <p className="text-2xl leading-relaxed">
              We believe that agricultural innovation should be accessible to all.
              Our mission is to provide high-quality, cost-effective solutions that
              help farmers succeed while promoting sustainable practices.
            </p>
          </div>
        </div>

        <div className="space-y-16">
          <div className="max-w-3xl">
            <h3 className="text-4xl font-medium lg:text-6xl mb-8">
              We make agricultural solutions accessible
            </h3>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Through innovation and dedication, we&apos;re helping farmers worldwide
              access the tools they need for success.
            </p>
          </div>

          <div className="grid gap-16 md:grid-cols-3">
            {[
              {
                icon: Files,
                title: "Research Excellence",
                description:
                  "Our commitment to scientific research ensures the highest quality products for our customers.",
              },
              {
                icon: CircleArrowRight,
                title: "Global Impact",
                description:
                  "We&apos;re expanding our reach to bring innovative solutions to farmers around the world.",
              },
              {
                icon: Settings,
                title: "Sustainable Practices",
                description:
                  "We prioritize environmental responsibility in everything we do, from development to delivery.",
              },
            ].map((item, index) => (
              <div key={index} className="group space-y-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <item.icon className="h-6 w-6 text-primary transition-transform group-hover:scale-110" />
                </div>
                <h4 className="text-xl font-medium">{item.title}</h4>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-16 md:grid-cols-2 items-center">
          <div>
            <h2 className="text-4xl font-medium lg:text-6xl">
              We&apos;re changing agriculture through science
            </h2>
          </div>
          <div className="space-y-8">
            <div className="group relative overflow-hidden rounded-xl aspect-video">
              <img
                src="https://shadcnblocks.com/images/block/placeholder.svg"
                alt="placeholder"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              And we&apos;re looking for passionate individuals to help us do it. If
              you&apos;re dedicated to making a difference in agriculture, this might
              be the place for you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { About1 };
