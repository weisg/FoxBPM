/**
 * Copyright 1996-2014 FoxBPM ORG.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *      http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 
 * @author yangguangftlp
 */
package org.foxbpm.bpmn.converter;

import java.util.Iterator;

import org.dom4j.Element;
import org.foxbpm.bpmn.constants.BpmnXMLConstants;
import org.foxbpm.model.BaseElement;

/**
 * 模型基类转换处理类
 * 
 * @author yangguangftlp
 * @date 2014年10月15日
 */
public abstract class BaseElementXMLConverter implements FlowElementFactory {
	
	public abstract Class<? extends BaseElement> getBpmnElementType();
	
	@SuppressWarnings("rawtypes")
	public void convertXMLToModel(Element element, BaseElement baseElement) {
		baseElement.setId(element.attributeValue(BpmnXMLConstants.ATTRIBUTE_ID));
		Element elem = null;
		String nodeName = null;
		for (Iterator iterator = element.elements().iterator(); iterator.hasNext();) {
			elem = (Element) iterator.next();
			nodeName = elem.getName();
			if (BpmnXMLConstants.ELEMENT_DOCUMENTATION.equalsIgnoreCase(nodeName)) {
				baseElement.setDocumentation(elem.getText());
			}
		}
	}
	public void convertModelToXML(Element element, BaseElement baseElement) {
	}
	public abstract String getXMLElementName();
}