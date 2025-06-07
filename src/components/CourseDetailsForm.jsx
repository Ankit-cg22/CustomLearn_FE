import { Form, Input, InputNumber, Button, Select } from "antd"

const CourseDetailsForm = ({ onFinish, loading }) => {
    const [form] = Form.useForm()
    return (
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md mx-auto">
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
            >
                <Form.Item name="skill" label={<span className="font-semibold">Topic you want to learn</span>} rules={[{ required: true, message: "Please enter a topic" }]}> 
                    <Input placeholder="e.g. Python, Data Science" className="py-2" />
                </Form.Item>
                <Form.Item name="currentKnowledge" label={<span className="font-semibold">Your current experience</span>} rules={[{ required: true, message: "Please describe your current knowledge" }]}> 
                    <Input placeholder="e.g. Beginner, know basics, etc." className="py-2" />
                </Form.Item>
                <Form.Item name="hoursPerWeek" label={<span className="font-semibold">Hours per week</span>} rules={[{ required: true, message: "Please enter hours per week" }]}> 
                    <InputNumber min={1} max={80} className="w-full py-2" style={{width : "100%"}}  placeholder="e.g. 5" />
                </Form.Item>
                <Form.Item name="noOfWeeks" label={<span className="font-semibold">Number of weeks</span>} rules={[{ required: true, message: "Please enter number of weeks" }]}> 
                    <InputNumber min={1} max={52} className="py-2" style={{width : "100%"}} placeholder="e.g. 8" />
                </Form.Item>
                <Form.Item name="learningStyle" label={<span className="font-semibold">Preferred learning style</span>} rules={[{ required: true, message: "Please select at least one learning style" }]}> 
                    <Select mode="multiple" placeholder="Select style(s)" className="w-full">
                        <Select.Option value="video">Video</Select.Option>
                        <Select.Option value="articles">Articles</Select.Option>
                        <Select.Option value="project">Project</Select.Option>
                        <Select.Option value="case_studies">Case studies</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item name="learningGoal" label={<span className="font-semibold">Your final goal</span>} rules={[{ required: true, message: "Please enter your learning goal" }]}> 
                    <Input placeholder="e.g. Build a web app, get a job, etc." className="py-2" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" block loading={loading} className="bg-blue-600 hover:bg-blue-700 h-10 text-base font-semibold">
                        Generate
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default CourseDetailsForm