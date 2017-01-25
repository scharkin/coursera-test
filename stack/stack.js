function isNumber(o) {
  return typeof o === 'number' && isFinite(o);
}
var category = ['Rent Savings', 'Labor Savings', 'Other Savings', 'Net Revenue Loss'];
var now = new Date(),
  year = now.getFullYear();
var quarters = [];
for (var year = now.getFullYear(), y = 0; y < 4; y++) {
  for (var q = 1; q <= 4; q++) {
    quarters.push('Q' + q + ' ' + (year + y));
  }
}
quarters.push('Q1 ' + (year + y));
for (var q = 1; q <= 4; q++) {
  quarters.push('Q' + q + ' ' + year);
}
var data = {
  columns: [
    [category[0], 0, 0.15, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
    [category[1], 0, 0.15, 0.5, 1.0, 2.0, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5],
    [category[2], 0, 0.15, 0.5, 1.5, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0],
    [category[3], 0, -0.5, -1.5, -2.0, -2.5, -3.0, -3.0, -3.0, -3.0, -3.0, -3.0, -3.0, -3.0, -3.0, -3.0, -3.0, -3.0]
  ],
  types: {},
  groups: [
    [category[0], category[1], category[2], category[3]]
  ]
};
var i, j,
  rows = data.columns.length,
  cols = data.columns[0].length,
  totals = ['Net Impact'];

for (i = 0; i < rows; i++) {
  data.types[category[i]] = "bar";
}
data.types[category[i]] = "line";

for (j = 1; j < cols; j++) {
  totals[j] = 0;
  for (i = 0; i < rows; i++) {
    totals[j] += data.columns[i][j];
  }
}
totals = totals.map(function (d) {
  return isNumber(d) ? parseInt(100 * d) / 100 : d;
});
data.columns.push(totals);

var chart = c3.generate({
  data: data,
  legend: {
    position: 'inset',
    inset: {
      anchor: 'top-left',
      x: 10,
      y: -20,
      step: 1
    }
  },
  padding: {
    top: 20
  },
  point: {
    r: 4
  },
  axis: {
    x: {
      type: "category",
      categories: quarters
    },
    y: {
      label: {
        text: '$ in Millions',
        position: 'outer-middle'
      }
    }
  },
  grid: {
    y: {
      lines: [{value: 0}]
    }
  },
  color: {
    pattern: ["#4682B4", "#B8860B", "#20B2AA", "#e60073", "#ffd700"]
  }
});
