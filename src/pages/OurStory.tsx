export default function OurStory() {
  return (
    <div className="page" style={{ background: '#EAF2D0' }}>

      {/* ── Split hero — text left, photo right ── */}
      <div className="story-page-hero">
        <div className="story-page-text" style={{ alignItems: 'center', textAlign: 'center' }}>
          <h1 style={{
            fontFamily: 'var(--font-script)',
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(80px, 6.5vw, 120px)',
            color: '#B4B534',
            lineHeight: 0.92,
            margin: '0 0 28px',
          }}>
            Our Story
          </h1>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '5px',
            textTransform: 'uppercase',
            color: '#B4B534',
          }}>
            Written by Jace
          </p>
        </div>
        <div className="story-page-photo">
          {/* background set via CSS */}
        </div>
      </div>

      {/* Block 1 */}
      <div className="story-block">
        <div className="story-image-wrap">
          <img src="/images/dj1.jpeg" alt="Devyn and Jace" />
        </div>
        <div className="story-text">
          <p>
            Our journey is a bit of a Hallmark Movie. It began back in 2017,
            when a coworker of mine offered to set me up with one of her friends.
            When I first saw a picture of Devyn, I immediately told my friend I
            wanted to go on a date with her if she was willing. We went on a date
            one evening at the end of November for hot chocolate and had a really
            great time. I was pretty intimidated but very interested, while Devyn
            felt we had a natural connection and was curious to see me again.
          </p>
          <p>
            I had every intention of asking her out again, but life had other
            plans. Over that year, I gradually became very sick and was eventually
            diagnosed with leukemia in December… just a few weeks after our date.
            How was I supposed to tell her I had a great time and would love to
            see her again, but that I had my hands full while undergoing chemo?
            So, in my young mind, I figured the best thing to do would be to ghost
            her. Classic boy mentality. Devyn, although interested, moved on and
            forgot about me.
          </p>
        </div>
      </div>

      <div style={{ height: '1px', background: 'var(--border)', maxWidth: '860px', margin: '0 auto' }} />

      {/* Block 2 */}
      <div className="story-block reverse">
        <div className="story-image-wrap">
          <img src="/images/dj3.jpeg" alt="Devyn and Jace" />
        </div>
        <div className="story-text">
          <p>
            Although it took a few years, I eventually beat cancer (heck yeah!).
            In the meantime, we both graduated from BYU. Devyn moved to England
            for graduate school and I stayed in Utah to study at the U of U.
          </p>
          <p>
            Serendipitously, I went to a Halloween party in Salt Lake five years
            after our first date and saw Devyn again. What a blast from the past!
            She was just as beautiful as I remembered, and I was just as lost as
            to how I could explain why I didn&apos;t reach out all those years ago.
            So I let the opportunity pass again. I did, however, make sure to
            point out Devyn to a friend to brag about how I took her on a date
            in the past.
          </p>
        </div>
      </div>

      <div style={{ height: '1px', background: 'var(--border)', maxWidth: '860px', margin: '0 auto' }} />

      {/* Block 3 */}
      <div className="story-block">
        <div className="story-image-wrap">
          <img src="/images/orchard.jpeg" alt="Devyn and Jace at the orchard" />
        </div>
        <div className="story-text">
          <p>
            It wasn&apos;t until Devyn saw me on a dating app, seven years after our
            first date, that we actually reconnected (thanks to her). She
            couldn&apos;t remember exactly what had happened between us, but I&apos;m so
            grateful she was willing to take a second chance with me. Our second
            first date was in May of 2025. It took quite a few dates after that
            for me to get the courage to bring up that first date so long ago in
            Provo, and why I never called her afterwards. That night was the same
            night we had our first kiss.
          </p>
          <p>
            After that, we were pretty inseparable. We became official in July
            and haven&apos;t really slowed down since. Trips, introductions to friends
            and family, sharing our hobbies, and many, many, many walks filled our
            weeks as our love for each other grew. In fact, it was on a trip to
            Virginia where I worked up the courage to tell her I loved her. Devyn
            waited a whole two days to tell me she loved me back — talk about
            making a guy suffer.
          </p>
        </div>
      </div>

      <div style={{ height: '1px', background: 'var(--border)', maxWidth: '860px', margin: '0 auto' }} />

      {/* Block 4 */}
      <div className="story-block reverse">
        <div className="story-image-wrap">
          <img src="/images/engagement.jpeg" alt="Devyn and Jace engagement" />
        </div>
        <div className="story-text">
          <p>
            I proposed to Devyn in Heber on April 8, 2026. We are so grateful we
            found each other after many years. It is very apparent to us that God
            had a hand in our story. We are so excited to spend the rest of our
            lives together!
          </p>
        </div>
      </div>

    </div>
  )
}
