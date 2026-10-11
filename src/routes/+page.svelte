<script>
  let { data } = $props();

  const person = data.person;

  // Zet custom JSON om naar een object wanneer nodig.
  function parseCustom(custom) {
    if (typeof custom === 'string') {
      return JSON.parse(custom);
    }

    return custom || {};
  }

  const custom = parseCustom(person.custom);

  const skills = [
    custom.skill1,
    custom.skill2,
    custom.skill3
  ].filter(Boolean);

  const hobbies = [
    custom.hobby1,
    custom.hobby2,
    custom.hobby3
  ].filter(Boolean);

  const initials = person.name
    ?.split(' ')
    .map((namePart) => namePart[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  let isOpen = $state(false);

  function toggleBook() {
    isOpen = !isOpen;
  }
</script>

<svelte:head>
  <title>{person.name} | Profile book</title>

  <link
    href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300..700&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<main class="profile-page">
  <article class:open={isOpen} class="book" data-scale="125">
    <section class="right-page">
      <section class="about">
        <h2>ABOUT ME</h2>

        <p>
          {person.bio || 'This member has not written an about me yet.'}
        </p>
      </section>

      <section class="skills">
        <h2>SKILLS</h2>

        <ul>
          {#each skills as skill}
            <li>{skill}</li>
          {:else}
            <li>No skills available</li>
          {/each}
        </ul>
      </section>

      <section class="hobbies">
        <h2>HOBBIES</h2>

        <ul>
          {#each hobbies as hobby}
            <li>{hobby}</li>
          {:else}
            <li>No hobbies available</li>
          {/each}
        </ul>
      </section>

      <button
        class="close-book"
        type="button"
        onclick={toggleBook}
      >
        CLOSE BOOK
      </button>
    </section>

    <div class="turning-page">
      <button
        class="front-cover"
        type="button"
        onclick={toggleBook}
      >
        <span class="cover-logo">
          {initials}
        </span>

        <h1>{person.name}</h1>

        <span class="cover-line"></span>

        <span class="cover-instruction">
          CLICK TO OPEN
        </span>
      </button>

      <section class="left-page">
        {#if person.mugshot_year2}
          <picture class="image-wrapper">
            <source
              type="image/avif"
              srcset={`https://fdnd.directus.app/assets/${person.mugshot_year2}?width=400&height=400&fit=cover&format=avif&quality=80`}
            />

            <source
              type="image/webp"
              srcset={`https://fdnd.directus.app/assets/${person.mugshot_year2}?width=400&height=400&fit=cover&format=webp&quality=80`}
            />

            <img
              class="profile-image"
              src={`https://fdnd.directus.app/assets/${person.mugshot_year2}?width=400&height=400&fit=cover&quality=80`}
              alt={`Profile of ${person.name}`}
            />
          </picture>
        {/if}

        <section class="personal-information">
          <p class="label">NAME</p>

          <h1>{person.name}</h1>

          <p class="label">TEAM</p>

          <p class="information-value">
            {person.team_s13 || 'No team available'}
          </p>

          <p class="label">SOCIALS</p>

          <nav class="social-links">
            {#if person.github_handle}
              <a
                class="social-link"
                href={`https://github.com/${person.github_handle}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/github.svg" alt="GitHub" />
              </a>
            {/if}

            <a
              class="social-link"
              href="https://www.linkedin.com/in/jasin-ahmed-964839247/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/Linkedin.png" alt="LinkedIn" />
            </a>
          </nav>
        </section>
      </section>
    </div>
  </article>
</main>

<style>
  /* Globale typografie: standaard modular scale 1,25 */
  :global(:root) {
    --font-heading: 'Cormorant Garamond', Georgia, serif;
    --font-body: Georgia, 'Times New Roman', serif;

    --text-base: 1rem;
    --text-small: 0.8rem;
    --text-heading: 1.5625rem;
    --text-name: 1.953125rem;
    --text-cover: 2.44140625rem;
  }

  .profile-page {
    --page-background: #eeeeee;
    --paper-color: #ffffff;
    --heading-color: #111111;
    --body-text-color: #111111;
    --label-color: #444444;
    --skill-background: #e5e5e5;
    --line-color: #222222;
    --social-border-color: #bcbcbc;
    --cover-background: #111111;
    --cover-text-color: #ffffff;
    --cover-detail-color: #ffffff;

    --book-radius: 1rem;
    --book-shadow: 0 0.5rem 1rem #0000001a;
    --page-padding: 2rem;
    --page-height: 34rem;

    --book-duration: 1.1s;
    --book-easing: cubic-bezier(0.22, 1, 0.36, 1);

    display: flex;
    justify-content: center;
    align-items: flex-start;

    width: 100%;
    min-height: 100svh;
    padding: 1rem;

    background-color: var(--page-background);
    font-family: var(--font-body);

    box-sizing: border-box;
    overflow-x: hidden;
  }

  /* Drie typografievarianten */

  .book[data-scale='1125'] {
    --text-small: 0.888889rem;
    --text-heading: 1.265625rem;
    --text-name: 1.423828rem;
    --text-cover: 1.601807rem;
  }

  .book[data-scale='125'] {
    --text-small: 0.8rem;
    --text-heading: 1.5625rem;
    --text-name: 1.953125rem;
    --text-cover: 2.44140625rem;
  }

  .book[data-scale='150'] {
    --text-small: 0.666667rem;
    --text-heading: 2.25rem;
    --text-name: 3.375rem;
    --text-cover: 5.0625rem;
  }

  /* Boek */

  .book {
    position: relative;

    width: 100%;
    max-width: 22rem;
    height: var(--page-height);

    perspective: 100rem;
    perspective-origin: center;
    transform-style: preserve-3d;

    overflow: hidden;

    transition:
      height var(--book-duration) var(--book-easing),
      transform var(--book-duration) var(--book-easing);

    &.open {
      height: calc(var(--page-height) * 2);

      .turning-page {
        /* Verticaal openen op mobiel */
        transform: rotateX(-180deg);
      }
    }
  }

  /* Beide kanten van de draaiende omslag */

  .turning-page {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;

    width: 100%;
    height: var(--page-height);

    transform: rotateX(0);
    transform-origin: center;
    transform-style: preserve-3d;

    will-change: transform;

    transition:
      transform var(--book-duration) var(--book-easing);
  }

  .front-cover,
  .left-page {
    position: absolute;
    inset: 0;

    width: 100%;
    height: 100%;

    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;

    box-sizing: border-box;
  }

  /* Voorkant */

  .front-cover {
    z-index: 2;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding: var(--page-padding);

    color: var(--cover-text-color);
    font: inherit;

    background:
      linear-gradient(
        145deg,
        #2b2b2b 0%,
        var(--cover-background) 50%,
        #000000 100%
      );

    border: 0.15rem solid var(--cover-detail-color);
    border-left: 0.7rem solid #000000;
    border-radius: var(--book-radius);

    box-shadow:
      0.5rem 0.5rem 0 #000000,
      0 0 0 0.3rem var(--cover-background);

    cursor: pointer;

    transition:
      box-shadow 0.3s ease,
      transform 0.3s ease;

    h1 {
      margin: 0;

      color: var(--cover-text-color);
      font-family: var(--font-heading);

      font-size: clamp(
        var(--text-name),
        1rem + 4vw,
        var(--text-cover)
      );

      font-weight: 500;
      font-variation-settings: 'wght' 500;
      line-height: 1.1;
      text-align: center;
      overflow-wrap: anywhere;
    }

    .cover-logo {
      display: grid;
      place-items: center;

      width: 6rem;
      height: 6rem;
      margin-bottom: 1.5rem;

      color: var(--cover-text-color);
      font-family: var(--font-heading);
      font-size: var(--text-heading);
      font-weight: 600;

      background-color: #1f1f1f;
      border: 0.12rem solid var(--cover-detail-color);
      border-radius: 50%;

      box-shadow:
        inset 0 0 1rem #00000080,
        0 0.4rem 1rem #0000004d;
    }

    .cover-line {
      width: 8rem;
      height: 0.25rem;
      margin: 1rem 0 2.5rem;

      background-color: var(--cover-detail-color);
      border-radius: 1rem;
    }

    .cover-instruction {
      color: var(--cover-text-color);
      font-size: max(0.875rem, var(--text-small));
      font-weight: 600;
      line-height: 1.5;
      letter-spacing: 0.08rem;
    }

    &:hover {
      box-shadow:
        0.7rem 0.7rem 0 #000000,
        0 0 0 0.3rem var(--cover-background);

      transform: translateY(-0.15rem);
    }

    &:focus-visible {
      outline: 0.2rem solid #ffffff;
      outline-offset: -0.5rem;
    }
  }

  /* Linkerpagina: achterkant van de omslag */

  .left-page {
    padding: var(--page-padding);

    background-color: var(--paper-color);
    border-radius: var(--book-radius);
    box-shadow: var(--book-shadow);

    transform: rotateX(180deg);
    overflow-y: auto;

    .image-wrapper {
      display: block;

      width: 100%;
      max-width: 15rem;
      margin: 0 auto 1.5rem;
    }

    .profile-image {
      display: block;

      width: 100%;
      aspect-ratio: 1 / 1;
      object-fit: cover;

      border: 0.15rem dashed var(--heading-color);
      border-radius: var(--book-radius);

      box-sizing: border-box;
    }

    .personal-information {
      .label {
        margin: 0;

        color: var(--label-color);
        font-size: max(0.875rem, var(--text-small));
        font-weight: bold;
        line-height: 1.5;
      }

      h1 {
        margin: 0.3rem 0 1rem;

        color: var(--body-text-color);
        font-family: var(--font-heading);

        font-size: clamp(
          var(--text-heading),
          1rem + 2vw,
          var(--text-name)
        );

        font-weight: 700;
        line-height: 1.15;
        overflow-wrap: anywhere;
      }

      .information-value {
        margin: 0.3rem 0 1rem;

        color: var(--body-text-color);
        font-size: var(--text-base);
        font-weight: 600;
        line-height: 1.65;
      }

      .social-links {
        display: flex;
        gap: 0.75rem;
        margin-top: 0.5rem;

        .social-link {
          display: grid;
          place-items: center;

          width: 2.5rem;
          height: 2.5rem;

          background-color: #ffffff;
          border: 0.1rem solid var(--social-border-color);
          border-radius: 50%;

          transition:
            transform 0.2s ease,
            border-color 0.2s ease;

          img {
            display: block;

            width: 1.4rem;
            height: 1.4rem;
            object-fit: contain;
          }

          &:hover {
            border-color: var(--heading-color);
            transform: translateY(-0.15rem);
          }

          &:focus-visible {
            outline: 0.15rem solid var(--heading-color);
            outline-offset: 0.2rem;
          }
        }
      }
    }
  }

  /* Rechterpagina */

  .right-page {
    position: absolute;
    top: var(--page-height);
    left: 0;
    z-index: 0;

    width: 100%;
    height: var(--page-height);
    padding: var(--page-padding);

    background-color: var(--paper-color);
    border-radius: var(--book-radius);
    box-shadow: var(--book-shadow);

    box-sizing: border-box;
    overflow-y: auto;

    .about,
    .skills,
    .hobbies {
      h2 {
        margin: 0 0 0.8rem;

        color: var(--heading-color);
        font-family: var(--font-heading);

        font-size: clamp(
          var(--text-base),
          1rem + 1.5vw,
          var(--text-heading)
        );

        font-weight: 700;
        line-height: 1.2;
      }
    }

    .about {
      padding-bottom: 1.5rem;

      p {
        margin: 0;

        color: var(--body-text-color);
        font-size: var(--text-base);
        line-height: 1.65;
      }
    }

    .skills,
    .hobbies {
      padding: 1.5rem 0;
      border-top: 0.1rem solid var(--line-color);

      ul {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;

        margin: 0;
        padding: 0;
        list-style: none;
      }
    }

    .skills {
      li {
        padding: 0.35rem 0.8rem;

        color: var(--body-text-color);
        font-size: var(--text-base);
        font-weight: bold;
        line-height: 1.65;

        background-color: var(--skill-background);
        border: 0.1rem solid #cccccc;
        border-radius: 2rem;

        &:first-child {
          color: #ffffff;
          background-color: var(--heading-color);
          border-color: var(--heading-color);
        }
      }
    }

    .hobbies {
      li {
        color: var(--body-text-color);
        font-size: var(--text-base);
        font-weight: 600;
        line-height: 1.65;
      }
    }

    .close-book {
      margin-top: 1.5rem;
      padding: 0.6rem 1rem;

      color: #ffffff;
      font: inherit;
      font-size: max(0.875rem, var(--text-small));
      font-weight: bold;
      line-height: 1.5;

      background-color: var(--heading-color);
      border: 0;
      border-radius: 2rem;

      cursor: pointer;

      transition:
        color 0.2s ease,
        background-color 0.2s ease,
        transform 0.2s ease;

      &:hover {
        color: var(--heading-color);
        background-color: #d9d9d9;
        transform: translateY(-0.1rem);
      }

      &:focus-visible {
        outline: 0.15rem solid var(--heading-color);
        outline-offset: 0.2rem;
      }
    }
  }

  /* Variable font: animeer het lettergewicht */

  @keyframes book-font-weight {
    from {
      font-variation-settings: 'wght' 400;
    }

    to {
      font-variation-settings: 'wght' 700;
    }
  }

  .front-cover:focus-visible h1 {
    animation: book-font-weight 1.5s ease-in-out infinite alternate;
  }

  @media (hover: hover) {
    .front-cover:hover h1 {
      animation: book-font-weight 1.5s ease-in-out infinite alternate;
    }
  }

  /* Desktop: horizontaal openen */

  @media (min-width: 1080px) {
    .profile-page {
      align-items: center;
      padding: 2rem;
      overflow: hidden;
    }

    .book {
      --page-height: 38rem;

      overflow: visible;

      &.open {
        height: var(--page-height);
        transform: translateX(50%);

        .turning-page {
          transform: rotateY(-180deg);
        }
      }
    }

    .turning-page {
      height: var(--page-height);
      transform: rotateY(0);
      transform-origin: left center;
    }

    .left-page,
    .right-page {
      padding: 3rem;
    }

    .left-page {
      display: flex;
      flex-direction: column;
      justify-content: center;

      border-right: 0.15rem solid var(--line-color);

      border-radius:
        var(--book-radius)
        0
        0
        var(--book-radius);

      transform: rotateY(180deg);

      .image-wrapper {
        max-width: 15rem;
        margin: 0 auto 1.5rem;
      }
    }

    .right-page {
      top: 0;

      display: flex;
      flex-direction: column;
      justify-content: center;

      border-radius:
        0
        var(--book-radius)
        var(--book-radius)
        0;
    }
  }

  /* Minder beweging */

  @media (prefers-reduced-motion: reduce) {
    .book,
    .turning-page,
    .front-cover,
    .social-link,
    .close-book {
      transition-duration: 0.01ms;
    }

    .front-cover h1 {
      animation: none !important;
    }
  }
</style>