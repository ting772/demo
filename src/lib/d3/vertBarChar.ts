import * as d3 from 'd3'

import { isDef } from '@/utils/utils'

export enum Sort {
  NONE,//不排序
  ASC,//升序
  DSC//降序
}

export interface vertBarChartOptions<D = object> {
  width?: number;
  height?: number;
  margin?: number[];
  data?: D[];
  getX: (d: D) => any;//从D中抽取该项的X值
  getY: (d: D) => number;//从D中抽取该项的Y值

  color?: {
    bg?: string;//图表背景色
    bar?: string;//柱背景色
  };

  sortY?: Sort;//根据Y值排序

  //xscale如需扩展参考 https://d3js.org/d3-scale/band
  xScale?: {
    padding?: number;
    paddingInner?: number;
    paddingOuter?: number;
  };

  //X轴，Y轴如需扩展参考 https://d3js.org/d3-axis文档添加字段
  yAxis?: {
    tickFormat?: (y: any) => any;
  },
  xAxis?: {
    tickSize?: number;
    tickSizeInner?: number;
    tickSizeOuter?: number;
  };

  //y轴标题控制
  yLegend?: {
    text?: string;
    [other: string]: any;
  };

  //是否显示X轴上数值线条
  hideXTicks?: boolean;
}

export function vertBarChart<D = object>(options: vertBarChartOptions<D>) {
  const {
    data = [],
    getX,
    getY,

    width = 200,
    height = 200,
    margin = [],

    color = {},
    sortY = Sort.NONE,

    xAxis = {},
    yAxis = {},

    yLegend = {},
    hideXTicks,
  } = options;

  const [marginTop = 60, marginRight = 0, marginBottom = 30, marginLeft = 30] = margin
  let xScale: any, yScale: any

  const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .style("background-color", color.bg || '')

  const barsGroup = svg.append('g')
  const xAxisGroup = svg.append("g").attr("transform", `translate(0,${height - marginBottom})`)
  const yAxisGroup = svg.append("g").attr("transform", `translate(${marginLeft},0)`)

  //更新数据
  const update = (data: D[]) => {

    //更新比例尺
    const updateScale = (data: D[]) => {
      xScale = d3.scaleBand()
        .range([marginLeft, width - marginRight])

      if (isDef(options.xScale)) {
        for (let [key, value] of Object.entries(options.xScale!)) {
          xScale[key](value)
        }
      } else {
        xScale.padding(0.2)
      }

      //是否按y值排序
      if (sortY > Sort.NONE) {
        xScale.domain(d3.groupSort(data, ([d]) => (sortY == Sort.ASC ? 1 : -1) * getY(d), getX))
      } else {
        xScale.domain(data.map(getX)) // 不排序
      }

      yScale = d3.scaleLinear()
        .domain([0, d3.max(data, getY)!])
        .range([height - marginBottom, marginTop])
    }

    //更新柱子
    const updateRect = (rects: any) => {
      rects
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', xScale.bandwidth())
        .attr('height', (d: D) => yScale(0) - yScale(getY(d)))
        .attr("fill", color.bar || '#409eff')
    }

    //更新柱子关联数据
    const updateText = (texts: any) => {
      texts.text((d: any) => d.value)
        .attr('text-anchor', 'middle')
        .attr("x", xScale.bandwidth() / 2)
        .attr("y", -4)
    }

    updateScale(data)

    //画柱
    barsGroup
      .selectAll('g')
      .data(data)
      .join(
        enter => {
          return enter
            .append('g')
            .attr('transform', d => `translate(${xScale(getX(d))},${yScale(getY(d))})`)
            .call(g => {
              updateRect(g.append('rect'))
              updateText(g.append('text'))
            })
        },
        update => {
          updateRect(update.select('rect'))
          updateText(update.select('text'))
          return update
        }
      )
      .attr('transform', d => `translate(${xScale(getX(d))},${yScale(getY(d))})`)

    //x轴
    xAxisGroup
      .call(g => {
        let axis = d3.axisBottom(xScale) as any
        axis.tickSizeOuter(0)
        for (const [key, value] of Object.entries(xAxis)) {
          axis[key](value)
        }
        axis(g)
      })
      .call(g => {
        if (hideXTicks) {
          g.selectAll('.tick').remove()
        }
      })

    //y轴
    yAxisGroup
      .call(g => {
        let axis = d3.axisLeft(yScale) as any
        for (const [key, value] of Object.entries(yAxis)) {
          axis[key](value)
        }
        axis(g)
      })
      .call(g => g.select(".domain").remove())
      .call(g => {
        //y轴方向此标题
        if (yLegend.text) {
          let text = g.append('text')
            .attr("text-anchor", "middle")
            .attr('x', 0)
            .attr('y', 20)

          for (const [key, value] of Object.entries(yLegend)) {
            if (key == 'text') {
              text[key](value)
            } else {
              text.attr(key, value)
            }
          }
        }
      })
  }

  update(data)
  return { svg: svg.node(), update }
}
