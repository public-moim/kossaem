import React from 'react'
import { RxEnter } from "react-icons/rx";
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="dashboard">
            <div className="left">
              <div className="summary">
                <div className="dbBox">
                  <div className='dbBox-name'>Points earned <span className='dbNumber'>9</span></div>
                  <div className="smallgraph">Graph</div>

                </div>

                <div className="dbBox">
                  <div className='dbBox-name'>New request <span className='dbNumber'>2</span></div>
                  <div className="smallgraph">Graph</div>

                </div>

                <div className="dbBox">
                  <div className='dbBox-name'>Chat reply rate <span className='dbNumber'>100%</span></div>
                  <div className="smallgraph">Graph</div>

                </div>
              </div>

              <div className="graphContainer dbBox">
                p
              </div>
            </div>

            <div className="right">
              <div className="dbBox activeChat">
                <div className="title">
                  
                  <p>Available student</p>
                  <Link className="icon" to='/teacher/chat'>
                  
                  <RxEnter/>
                  
                  </Link>
                  
                 
                </div>

               

                <div className="chatProfile">
                  <div className="profPict-small"><span className='activeState'></span></div>
                  <div className="userName">Syahri</div>
                  <div className="secondary-button">Say Hi</div>
                </div>
              </div>

            </div>
            
            
    </div>
  )
}

export default Dashboard
