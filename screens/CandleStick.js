import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const CandlestickChart = ({ data }) => {
  const chartHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <script src="https://unpkg.com/lightweight-charts/dist/lightweight-charts.standalone.production.js"></script>
      <style>
        body, html {
          height: 100%;
          margin: 0;
          padding: 0;
        }
        #chart-container {
          width: 100%;
          height: 100%;
        }
      </style>
    </head>
    <body>
      <div id="chart-container"></div>
      <script>
        const chart = LightweightCharts.createChart(document.getElementById('chart-container'), {
          width: window.innerWidth,
          height: window.innerHeight,
        });

        const candlestickSeries = chart.addCandlestickSeries();
        candlestickSeries.setData(${JSON.stringify(data)});
      </script>
    </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{ html: chartHtml }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CandlestickChart;
