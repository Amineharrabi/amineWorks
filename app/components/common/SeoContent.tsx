import { FOOTER_LINKS, PROJECTS, WORK_TIMELINE } from "@constants";

/**
 * The site is drawn in a WebGL canvas, which search engines and screen readers can't read.
 * This mirrors the same content as plain, visually hidden HTML.
 */
const SeoContent = () => (
  <main className="sr-only">
    <h1>Amine Harrabi</h1>
    <p>
      Hi, I am Amine Harrabi, a data engineer and machine learning developer from Sfax, Tunisia.
      I make things, mainly digital things. The gap between a thing that functions and a thing
      that resonates is where I spend most of my time.
    </p>

    <section>
      <h2>Work and education</h2>
      <ul>
        {WORK_TIMELINE.map((item) => (
          <li key={`${item.year}-${item.title}`}>
            {item.year}: {item.title}{item.subtitle && `, ${item.subtitle}`}
          </li>
        ))}
      </ul>
    </section>

    <section>
      <h2>Side projects</h2>
      {PROJECTS.map((project) => (
        <article key={project.title}>
          <h3>{project.url ? <a href={project.url}>{project.title}</a> : project.title}</h3>
          <p>{project.subtext}</p>
        </article>
      ))}
    </section>

    <section>
      <h2>Find me online</h2>
      <ul>
        {FOOTER_LINKS.map((link) => (
          <li key={link.name}>
            <a href={link.url} rel="me">{link.name}</a>
          </li>
        ))}
      </ul>
    </section>
  </main>
);

export default SeoContent;
