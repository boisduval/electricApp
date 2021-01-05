import React, {Component} from 'react';
import {Container, Echarts} from './components';
import * as echarts from 'echarts';

class App extends Component {
  getChartRef() {
    return this.echarts && this.echarts.chart ? this.echarts.chart : undefined;
  }

  render() {
    return (
      <Container width={this.props.width}>
        <Echarts ref={(ref) => (this.echarts = ref)} {...this.props} />
      </Container>
    );
  }
}

// export {echarts};

export {App as Echarts, echarts};
