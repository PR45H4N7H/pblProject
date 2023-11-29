import React, { Component, createRef } from 'react';
import Chart from 'chart.js/auto';
import projectService from '../services/projectService';

class TotalProjects extends Component {
    chartRef = createRef();
    chartRef2 = createRef();
    chartRef3 = createRef();
    chartRef4 = createRef(); // Scatter Chart
    chartBar = null;
    chartDoughnut = null;
    chartMultiType = null;
    chartScatter = null;

    async componentDidMount() {
        try {
            const response = await projectService.getAllProjects();
            const projects = response.data;

            // Bar Chart
            const labels = projects.map((project) => project.projName);
            const projectExperience = projects.map((project) => project.projExp);

            const ctx = this.chartRef.current.getContext('2d');

            // Destroy the existing chart if it exists
            if (this.chartBar) {
                this.chartBar.destroy();
            }

            this.chartBar = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Project Experience',
                            data: projectExperience,
                            backgroundColor: 'aqua',
                            borderColor: 'black',
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    scales: {
                        x: {
                            type: 'category',
                        },
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });

            // Doughnut Chart
            const labelsDoughnut = projects.map((project) => project.projName);
            const projectRequirements = projects.map((project) => project.projReq.split(',').map(item => item.trim()));

            // Flatten the projectRequirements array
            const flattenedRequirements = projectRequirements.flat();

            const uniqueRequirements = [...new Set(flattenedRequirements)]; // Get unique requirements

            const requirementCounts = uniqueRequirements.map(req => flattenedRequirements.filter(item => item === req).length);

            const ctxDoughnut = this.chartRef2.current.getContext('2d');

            // Destroy the existing chart if it exists
            if (this.chartDoughnut) {
                this.chartDoughnut.destroy();
            }

            // Set canvas size for the Doughnut Chart
            const squareSize = Math.min(this.chartRef2.current.width, this.chartRef2.current.height);
            this.chartRef2.current.width = squareSize;
            this.chartRef2.current.height = squareSize;

            this.chartDoughnut = new Chart(ctxDoughnut, {
                type: 'doughnut',
                data: {
                    labels: labelsDoughnut,
                    datasets: [
                        {
                            label: 'Project Requirements',
                            data: requirementCounts,
                            backgroundColor: ['purple', 'pink', 'black', 'yellow', 'orange', 'grey', 'red'], // Customize colors
                        },
                    ],
                },
            });

            // Multi-type Chart
            const labelsMultiType = projects.map((project) => project.projName);
            const flags = projects.map((project) => project.flags);
            const requestCount = projects.map((project) => project.requestCount);

            const ctxMultiType = this.chartRef3.current.getContext('2d');

            // Destroy the existing chart if it exists
            if (this.chartMultiType) {
                this.chartMultiType.destroy();
            }

            this.chartMultiType = new Chart(ctxMultiType, {
                type: 'bar',
                data: {
                    labels: labelsMultiType,
                    datasets: [
                        {
                            label: 'Flags',
                            data: flags,
                            backgroundColor: 'red',
                            borderColor: 'black',
                            borderWidth: 1,
                            yAxisID: 'flags-y-axis',
                        },
                        {
                            label: 'Request Count',
                            data: requestCount,
                            type: 'line',
                            borderColor: 'blue',
                            borderWidth: 2,
                            fill: false,
                            yAxisID: 'requestCount-y-axis',
                        },
                    ],
                },
                options: {
                    scales: {
                        x: {
                            type: 'category',
                        },
                        'flags-y-axis': {
                            type: 'linear',
                            position: 'left',
                        },
                        'requestCount-y-axis': {
                            type: 'linear',
                            position: 'right',
                        },
                    },
                },
            });

            // Scatter Chart (Bubble Chart)
            const labelsScatter = projects.map((project) => project.projName);
            const projReqTechnologies = projects.map((project) => project.projReq.split(',').map(item => item.trim()));

            const uniqueTechnologies = [...new Set(projReqTechnologies.flat())];

            const datasets = uniqueTechnologies.map((technology) => {
                const data = projReqTechnologies.map((projReq, index) => {
                    const bubbleSize = projReq.includes(technology) ? 10 : 0; // Set bubble size based on technology presence
                    return { x: labelsScatter[index], y: technology, r: bubbleSize };
                });

                return {
                    label: technology,
                    data: data,
                    backgroundColor: 'rgba(75,192,192,0.4)', // Customize bubble color
                    borderColor: 'rgba(75,192,192,1)',
                    borderWidth: 1,
                };
            });

            const ctxScatter = this.chartRef4.current.getContext('2d');

            // Destroy the existing chart if it exists
            if (this.chartScatter) {
                this.chartScatter.destroy();
            }

            this.chartScatter = new Chart(ctxScatter, {
                type: 'bubble',
                data: {
                    datasets: datasets,
                },
                options: {
                    scales: {
                        x: {
                            type: 'category',
                        },
                        y: {
                            type: 'category',
                        },
                    },
                },
            });

            console.log('Bar, Doughnut, Multi-type, and Scatter Charts created successfully');
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    render() {
        return (
            <div className="container" >
                <div className="row">
                    <div className="col-md-6 mb-4">
                        <div className="border p-3">
                            Project Experience
                            <div>
                                <canvas ref={this.chartRef} />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 mb-4">
                        <div className="border p-3">
                            Project Requirements
                            <div>
                                <canvas ref={this.chartRef2} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 mb-4">
                        <div className="border p-3">
                            Requests and Flags
                            <div>
                                <canvas ref={this.chartRef3} />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 mb-4">
                        <div className="border p-3">
                            Scatter Chart
                            <div>
                                <canvas ref={this.chartRef4} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TotalProjects;
