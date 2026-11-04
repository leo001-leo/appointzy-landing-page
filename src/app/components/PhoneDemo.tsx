import bookingScreen from "../../assets/app/booking.webp";
import calendarScreen from "../../assets/app/calendar.webp";
import { useT } from "../../i18n";

// The reminder exactly as Appointzy sends it by default (SmsTemplateDefaults,
// Reminder), for the invented practice on the two screens.
const SMS = "Potsetnik: Vasiot termin vo Dental Demo e na 05.11.2026 vo 10:00. Ve ocekuvame!";

/**
 * The hero's product picture: real screens of the app on a phone, filmed on
 * an invented practice (Дентал Демо, invented patients). One ten second loop
 * in three scenes, CSS only, so it plays without JavaScript, in low power mode
 * and before the bundle loads: the booking is saved, it is in Thursday's
 * calendar, and the patient's reminder arrives the day before. The step
 * labels light up with their scene. Reduced motion shows the reminder still.
 */
export function PhoneDemo() {
  const t = useT().hero;
  return (
    <div className="phone-demo flex items-center gap-5 sm:gap-8 lg:flex-col lg:gap-7">
      <div className="relative w-[46%] max-w-[15rem] shrink-0 sm:w-56 lg:w-64 lg:max-w-none">
        <div
          aria-hidden="true"
          className="absolute -inset-6 rounded-[3rem] bg-[radial-gradient(circle_at_50%_45%,rgba(234,88,12,0.35),transparent_70%)] blur-2xl"
        />
        <div className="relative rounded-[2.1rem] border border-white/15 bg-[#0b0a09] p-[7px] shadow-[0_40px_90px_-30px_rgba(0,0,0,0.95)]">
          <div className="relative aspect-[390/760] overflow-hidden rounded-[1.65rem] bg-white">
            <img
              src={bookingScreen}
              alt={t.demoBookingAlt}
              width={780}
              height={1520}
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* The finger on "Додади термин" */}
            <span aria-hidden="true" className="demo-tap absolute left-1/2 top-[94%] h-10 w-10 rounded-full bg-flame/45 ring-4 ring-flame/30" />

            <div className="demo-s2 absolute inset-0">
              <img
                src={calendarScreen}
                alt={t.demoCalendarAlt}
                width={780}
                height={1520}
                loading="lazy"
                className="h-full w-full object-cover"
              />
              {/* Марија Петровска, the booking just made */}
              <span aria-hidden="true" className="demo-ring absolute left-[21.5%] top-[36.2%] h-[4.6%] w-[74.5%] rounded-md ring-[3px] ring-flame shadow-[0_0_0_6px_rgba(234,88,12,0.18)]" />
            </div>

            {/* The patient's phone the day before: the reminder arrives */}
            <div className="demo-s3 absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,#3b2a20_0%,#15110f_70%)] text-white">
              <div className="mt-[22%] text-center">
                <div className="text-[0.62rem] font-medium tracking-wide text-white/70 sm:text-xs">{t.demoLockDate}</div>
                <div className="mt-0.5 text-[2.6rem] font-semibold leading-none tracking-tight sm:text-5xl">10:00</div>
              </div>
              <div className="demo-sms absolute left-[5%] right-[5%] top-[44%] rounded-2xl bg-white/90 p-2.5 text-ink shadow-[0_18px_40px_-12px_rgba(0,0,0,0.7)] backdrop-blur-md sm:p-3">
                <div className="flex items-center gap-1.5">
                  <span className="flex h-4 w-4 items-center justify-center rounded-[5px] bg-[#34c759] sm:h-5 sm:w-5">
                    <svg className="h-2.5 w-2.5 text-white sm:h-3 sm:w-3" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 3C6.5 3 2 6.6 2 11c0 2.4 1.3 4.6 3.4 6L4.5 21l4.2-2.2c1 .3 2.1.4 3.3.4 5.5 0 10-3.6 10-8S17.5 3 12 3z" />
                    </svg>
                  </span>
                  <span className="text-[0.62rem] font-semibold sm:text-xs">Termin-Info</span>
                  <span className="ml-auto text-[0.55rem] text-ink/50 sm:text-[0.68rem]">{t.demoNow}</span>
                </div>
                <p className="mt-1 text-[0.62rem] leading-snug sm:text-xs">{SMS}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ol className="space-y-3 text-sm leading-snug sm:text-base lg:grid lg:grid-cols-3 lg:gap-4 lg:space-y-0 lg:text-sm">
        {t.demoSteps.map((step, i) => (
          <li key={step} className={`demo-l${i + 1} flex items-start gap-2.5 text-ink-fg lg:flex-col lg:gap-1.5`}>
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-flame/15 text-xs font-semibold text-flame">
              {i + 1}
            </span>
            {step}
          </li>
        ))}
      </ol>
    </div>
  );
}
