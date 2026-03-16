import { useRef, useEffect } from 'react'
import { Chart, registerables } from 'chart.js'
import annotationPlugin from 'chartjs-plugin-annotation'

Chart.register(...registerables, annotationPlugin)

export default function GPRChart({ isDark }) {
  const canvasRef = useRef(null)
  const chartRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Destroy existing chart on theme change
    if (chartRef.current) {
      chartRef.current.destroy()
      chartRef.current = null
    }

    const ctx = canvas.getContext('2d')

    const CORAL = '#E8715A'
    const GOLD = '#E5A84B'
    const TEAL = '#5DAE7C'
    const BLUE = '#5B9BD5'

    const textColor = isDark ? 'rgba(205,215,230,0.7)' : 'rgba(60,68,82,0.72)'
    const gridColor = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.045)'
    const tickColor = isDark ? 'rgba(205,215,230,0.55)' : 'rgba(60,68,82,0.55)'
    const bgSurface = isDark ? '#0D1117' : '#FAF7F2'

    const chartHeight = canvas.parentElement ? canvas.parentElement.clientHeight : 320
    const gradientFill = ctx.createLinearGradient(0, 0, 0, chartHeight)
    if (isDark) {
      gradientFill.addColorStop(0, 'rgba(232,113,90,0.18)')
      gradientFill.addColorStop(0.6, 'rgba(232,113,90,0.06)')
      gradientFill.addColorStop(1, 'rgba(232,113,90,0.0)')
    } else {
      gradientFill.addColorStop(0, 'rgba(232,113,90,0.14)')
      gradientFill.addColorStop(0.6, 'rgba(232,113,90,0.04)')
      gradientFill.addColorStop(1, 'rgba(232,113,90,0.0)')
    }

    Chart.defaults.color = textColor
    Chart.defaults.font.family = "'JetBrains Mono', monospace"

    const years = ['2008','2009','2010','2011','2012','2013','2014',
                   '2015','2016','2017','2018','2019','2020','2021',
                   '2022','2023','2024','2025']
    const values = [118, 88, 72, 78, 68, 70, 128,
                    102, 88, 108, 82, 92, 98, 93,
                    167.3, 138, 122, 112]

    function badge(bg, fg, size) {
      return {
        display: true,
        position: 'start',
        backgroundColor: bg,
        color: fg || '#fff',
        font: { size: size || 10, family: "'JetBrains Mono', monospace", weight: '600' },
        padding: { top: 4, bottom: 4, left: 8, right: 8 },
        borderRadius: 12,
      }
    }

    chartRef.current = new Chart(canvas, {
      type: 'line',
      data: {
        labels: years,
        datasets: [{
          label: 'GPR Index',
          data: values,
          borderColor: CORAL,
          backgroundColor: gradientFill,
          fill: true,
          tension: 0.38,
          pointRadius: 0,
          pointHoverRadius: 7,
          pointHoverBackgroundColor: CORAL,
          pointHoverBorderColor: bgSurface,
          pointHoverBorderWidth: 2.5,
          borderWidth: 2.8,
          borderCapStyle: 'round',
          borderJoinStyle: 'round',
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: isDark ? 'rgba(13,17,23,0.92)' : 'rgba(250,247,242,0.95)',
            titleColor: isDark ? CORAL : '#C4563A',
            bodyColor: isDark ? '#cbd5e1' : '#3c4452',
            borderColor: isDark ? 'rgba(232,113,90,0.25)' : 'rgba(232,113,90,0.2)',
            borderWidth: 1,
            cornerRadius: 8,
            titleFont: { family: "'JetBrains Mono', monospace", weight: '600', size: 12 },
            bodyFont: { family: "'JetBrains Mono', monospace", size: 11 },
            padding: { top: 8, bottom: 8, left: 12, right: 12 },
            displayColors: false,
            callbacks: {
              title: (items) => items[0].label,
              label: (item) => 'GPR  ' + item.parsed.y.toFixed(1)
            }
          },
          annotation: {
            annotations: {
              crimea: {
                type: 'line',
                xMin: '2014', xMax: '2014',
                borderColor: isDark ? 'rgba(93,174,124,0.5)' : 'rgba(93,174,124,0.45)',
                borderWidth: 1.5,
                borderDash: [5, 4],
                label: { ...badge('rgba(93,174,124,0.88)', '#fff', 10), content: 'Crimea annexed' }
              },
              notpetya: {
                type: 'line',
                xMin: '2017', xMax: '2017',
                borderColor: isDark ? 'rgba(91,155,213,0.35)' : 'rgba(91,155,213,0.3)',
                borderWidth: 1,
                borderDash: [3, 3],
                label: { ...badge(isDark ? 'rgba(91,155,213,0.7)' : 'rgba(91,155,213,0.65)', '#fff', 9), content: 'NotPetya' }
              },
              invasion: {
                type: 'line',
                xMin: '2022', xMax: '2022',
                borderColor: GOLD,
                borderWidth: 2,
                borderDash: [6, 4],
                label: { ...badge('rgba(229,168,75,0.92)', isDark ? '#0D1117' : '#2c1e05', 11), content: 'Full invasion: 167.3' }
              }
            }
          }
        },
        scales: {
          x: {
            border: { display: false },
            grid: { color: gridColor, drawTicks: false },
            ticks: {
              color: tickColor,
              font: { family: "'JetBrains Mono', monospace", size: 10, weight: '400' },
              padding: 8,
              maxRotation: 0,
            }
          },
          y: {
            min: 50, max: 185,
            border: { display: false },
            grid: { color: gridColor, drawTicks: false },
            ticks: {
              color: tickColor,
              font: { family: "'JetBrains Mono', monospace", size: 10, weight: '400' },
              padding: 8,
              stepSize: 25,
            }
          }
        },
        animation: {
          duration: 2000,
          easing: 'easeOutQuart',
          delay: (context) => {
            if (context.type === 'data' && context.mode === 'default') {
              return context.dataIndex * 60
            }
            return 0
          }
        }
      }
    })

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy()
        chartRef.current = null
      }
    }
  }, [isDark])

  return <canvas ref={canvasRef} className="gpr-chart-canvas" height="320" />
}
