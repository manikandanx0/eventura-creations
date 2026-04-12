export default function About() {
  return (
    <>
      <section className="page-header">
        <div className="container content-narrow">
          <h1>About Eventura Creations</h1>
        </div>
      </section>

      <section className="about-story">
        <div className="container content-narrow">
          <p>
            Eventura Creations was founded with a simple belief:{' '}
            <strong>great events are built on clarity, coordination, and intent—not chaos</strong>.
          </p>
          <p>
            What began as a small team managing private celebrations quickly evolved into a full-service event
            management agency as clients sought more structured, reliable execution. Early projects highlighted a
            recurring gap in the industry—events looked good on paper but often failed in execution due to fragmented
            planning and poor on-ground coordination.
          </p>
          <p>Eventura was built to solve that problem.</p>
          <p>
            By focusing on detailed planning, transparent workflows, and hands-on execution, the team expanded into
            corporate events, product launches, and large-scale conferences. Each project refined Eventura&apos;s
            approach: planning first, design second, execution always.
          </p>
          <p>
            Today, Eventura Creations delivers end-to-end event experiences across corporate, private, and
            experiential formats—handling everything from concept development to final execution. The agency continues
            to operate with the same core philosophy it started with:{' '}
            <strong>every detail matters, and every event should run with purpose</strong>.
          </p>
        </div>
      </section>

      <section className="about-philosophy">
        <div className="container content-narrow">
          <blockquote className="philosophy-statement">
            <p>&quot;We believe successful events are built through preparation, precision, and people.&quot;</p>
          </blockquote>
        </div>
      </section>

      <section className="about-timeline">
        <div className="container content-narrow">
          <h2>Our Journey</h2>
          <div className="timeline">
            <div className="timeline-item">
              <span className="timeline-year">2019</span>
              <p className="timeline-event">Founded with a focus on private events and weddings</p>
            </div>
            <div className="timeline-item">
              <span className="timeline-year">2021</span>
              <p className="timeline-event">Expanded into corporate events and product launches</p>
            </div>
            <div className="timeline-item">
              <span className="timeline-year">2022</span>
              <p className="timeline-event">Delivered first multi-day corporate conference</p>
            </div>
            <div className="timeline-item">
              <span className="timeline-year">2023</span>
              <p className="timeline-event">Executed large-scale brand activations and expos</p>
            </div>
            <div className="timeline-item">
              <span className="timeline-year">2024</span>
              <p className="timeline-event">Established as a full-service event management agency</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-differentiators">
        <div className="container content-narrow">
          <h2>What Sets Us Apart</h2>
          <div className="differentiators-grid">
            <div className="differentiator">
              <h3>Planning First</h3>
              <p>We start with detailed planning and transparent workflows before any execution begins.</p>
            </div>
            <div className="differentiator">
              <h3>Hands-On Execution</h3>
              <p>Our team is on-ground managing every detail, ensuring nothing is left to chance.</p>
            </div>
            <div className="differentiator">
              <h3>End-to-End Service</h3>
              <p>From concept development to final execution, we handle every aspect of your event.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
