import { Info, MapPin, SchoolIcon, StarIcon, WorkflowIcon } from 'lucide-react';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslations } from '@/hooks/use-translations';

export default function TimelinesIndex() {
  const { t } = useTranslations();
  return (
        <div>
            <VerticalTimeline>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
              contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
              date="2025 - Openned Loan"
              iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
              icon={<WorkflowIcon />}
            >
              <h3 className="vertical-timeline-element-title">Pending Loan</h3>
              <h4 className="vertical-timeline-element-subtitle">28/05/2025</h4>
              <p>
                User: Test User<br />
                Book: Quia numquam.<br />
                Status: Pending<br />
                Return Date: 30/05/2025
              </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              contentStyle={{ background: 'rgb(243, 100, 33)', color: '#fff' }}
              contentArrowStyle={{ borderRight: '7px solid  rgb(243, 100, 33)' }}
              date="2022 - Returned Loan"
              iconStyle={{ background: 'rgb(243, 100, 33)', color: '#fff' }}
              icon={<WorkflowIcon />}
            >
              <h3 className="vertical-timeline-element-title">Returned Loan</h3>
              <h4 className="vertical-timeline-element-subtitle">25/05/2022</h4>
              <p>
                User: Test User<br />
                Book: Accusamus enim aperiam fugit rerum.<br />
                Status: Returned<br />
                Return Date: 25/05/2022
              </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
              contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
              date="2020 - Oppened Loan"
              iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
              icon={<WorkflowIcon />}
            >
              <h3 className="vertical-timeline-element-title">Pending Loan</h3>
              <h4 className="vertical-timeline-element-subtitle">23/04/2020</h4>
              <p>
                User: Test User<br />
                Book: Accusamus enim aperiam fugit rerum.<br />
                Status: Returned<br />
                Return Date: 25/05/2022
              </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              contentStyle={{ background: 'rgb(163, 33, 243)', color: '#fff' }}
              contentArrowStyle={{ borderRight: '7px solid  rgb(163, 33, 243)' }}
              date="2020 - Book Rreserved"
              iconStyle={{ background: 'rgb(163, 33, 243)', color: '#fff' }}
              icon={<WorkflowIcon />}
            >
              <h3 className="vertical-timeline-element-title">Book Rreserved</h3>
              <h4 className="vertical-timeline-element-subtitle">15/01/2020</h4>
              <p>
                User: Test User<br />
                Book: Accusamus enim aperiam fugit rerum.<br />
                Reservation Date: 15/01/2020
              </p>
            </VerticalTimelineElement>


            <VerticalTimelineElement
              iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
              icon={<MapPin />}
            />
          </VerticalTimeline>

        </div>
  );
}
