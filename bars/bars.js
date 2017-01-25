var chart = c3.generate({
  data: {
    rows: [
      ['Youngest', 'Balanced', 'Quality', 'Market'],
      [.17, .62, .65, .17],
      [.24, 1.15, 1.76, -.19],
      [.16, .53, .46, .23]
    ],
    type: 'bar',
    labels: {
      format: {
        'Youngest': d3.format('%'),
        'Balanced': d3.format('%'),
        'Quality': d3.format('%'),
        'Market': d3.format('%')
      }
    },
    legend: {
      position: 'inset',
      inset: {
        anchor: 'top-left',
        y: -52,
        step: 2
      }
    }
  },
  axis: {
    x: {
      tick: {
        format: function (d) {
          switch (d) {
            case 0:
              return "Performance + Geographical";
            case 1:
              return "Performance";
            default:
              return "Geographical";
          }
        }
      }
    },
    y: {
      show: false
    }
  },
  bar: {
    width: {
      ratio: 0.9
    }
  },
  color: {
    pattern: ["#A9A9A9", "#87CEFA", "#FFD700", "#b8b1e7"]
  },
  grid: {
    y: {
      lines: [{value: 0}]
    }
  },
  tooltip: {
    format: {
      value: d3.format('%')
    }
  }

});
