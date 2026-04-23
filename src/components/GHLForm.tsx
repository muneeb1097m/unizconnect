'use client'
import Script from 'next/script'

export default function GHLForm() {
  return (
    <div className="w-full bg-white rounded-xl overflow-hidden">
      <iframe
        src="https://fpanel.faseehlall.com/widget/survey/wlqVYlR11VSUtljxFn5l"
        style={{ border: 'none', width: '100%', minHeight: '700px' }}
        scrolling="no"
        id="wlqVYlR11VSUtljxFn5l"
        title="survey"
        className="overflow-hidden"
      />
      <Script src="https://fpanel.faseehlall.com/js/form_embed.js" strategy="afterInteractive" />
    </div>
  )
}
