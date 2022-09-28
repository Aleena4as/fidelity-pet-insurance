import Step from "./Step";
import PropTypes from 'prop-types';
const StepperHead = ({
	stepperContent,
	navigateToStepHandler,
	isVertical,
	isInline,
	isRightToLeftLanguage,
    currentTabIndex,
}) => (
	<div
		className={`stepper-head ${isVertical ? 'vertical-stepper-head' : ''} ${
			isInline ? 'inline-stepper-head' : ''
		}`}
	>
		{stepperContent?.map((el, i) => (
			<Step
				key={i}
				index={i}
				navigateToStepHandler={navigateToStepHandler}
				isActive={i === currentTabIndex}
				isComplete={el.isComplete}
				isWarning={el.isWarning}
				isError={el.isError}
				isRightToLeftLanguage={isRightToLeftLanguage}
				indicator={i + 1}
                label={el.label}
                
			/>
		))}
	</div>
);

StepperHead.propTypes = {
	stepperContent: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string.isRequired,
			content: PropTypes.node.isRequired,
			clicked: PropTypes.func,
			isWarning: PropTypes.bool,
			isError: PropTypes.bool,
			isComplete: PropTypes.bool,
			isLoading: PropTypes.bool,
		})
	),
	navigateToStepHandler: PropTypes.func.isRequired,
	currentTabIndex: PropTypes.number.isRequired,
	isInline: PropTypes.bool,
	isVertical: PropTypes.bool,
	isRightToLeftLanguage: PropTypes.bool,
};

export default StepperHead;