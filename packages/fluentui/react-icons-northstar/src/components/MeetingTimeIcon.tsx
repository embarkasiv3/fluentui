import * as React from 'react';
import cx from 'classnames';
import createSvgIcon from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

const MeetingTimeIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 18 16" className={classes.svg}>
      <path
        className={cx(iconClassNames.outline, classes.outlinePart)}
        d="M16,14H14v2h2Zm-5,2h2V14H11Zm0,3h2V17H11Zm8.5,4A3.5,3.5,0,1,1,23,19.5,3.5,3.5,0,0,1,19.5,23ZM9,20.914V11.5a.5.5,0,0,1,.5-.5H12v1a.5.5,0,0,0,1,0V11h4v1a.5.5,0,0,0,1,0V11h2.5a.5.5,0,0,1,.5.5v3.773A4.487,4.487,0,0,0,19.5,15a3.523,3.523,0,0,0-.5.047V14H17v1.758A4.477,4.477,0,0,0,15.758,17H14v2h1.047a3.523,3.523,0,0,0-.047.5,4.506,4.506,0,0,0,.75,2.477c-.25.007-.5.023-.75.023a18.422,18.422,0,0,1-5.664-.664.5.5,0,0,1-.242-.156A.406.406,0,0,1,9,20.914Zm13-5.156V11.5A1.511,1.511,0,0,0,20.5,10H18V9a.5.5,0,0,0-1,0v1H13V9a.5.5,0,0,0-1,0v1H9.5A1.511,1.511,0,0,0,8,11.5v9.414a1.329,1.329,0,0,0,.3.875,1.662,1.662,0,0,0,.789.516A19.823,19.823,0,0,0,15,23c.547,0,1.094-.016,1.641-.055A4.473,4.473,0,0,0,24,19.5,4.585,4.585,0,0,0,22,15.758ZM20,19h1.5v1H19V17h1Z"
      />
      <path
        className={cx(iconClassNames.filled, classes.filledPart)}
        d="M19.5,23A3.5,3.5,0,1,1,23,19.5,3.5,3.5,0,0,1,19.5,23Zm-4.453-4H14V17h1.758A4.558,4.558,0,0,0,15.047,19ZM14,14h2v2H14Zm3,0h2v1.047a4.558,4.558,0,0,0-2,.711Zm-4,2H11V14h2Zm0,3H11V17h2Zm9-3.242V11.5A1.511,1.511,0,0,0,20.5,10H18V9a.5.5,0,0,0-1,0v1H13V9a.5.5,0,0,0-1,0v1H9.5A1.511,1.511,0,0,0,8,11.5v9.414a1.373,1.373,0,0,0,.3.875,1.682,1.682,0,0,0,.789.516A19.286,19.286,0,0,0,15,23c.547,0,1.094-.016,1.641-.055A4.473,4.473,0,0,0,24,19.5,4.606,4.606,0,0,0,22,15.758ZM20,19h1.5v1H19V17h1Z"
      />
    </svg>
  ),
  displayName: 'MeetingTimeIcon',
});

export default MeetingTimeIcon;
