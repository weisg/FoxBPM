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
 * @author kenshin
 */
package org.foxbpm.engine.impl.bpmn.parser.model;

import org.foxbpm.engine.impl.bpmn.behavior.BaseElementBehavior;
import org.foxbpm.engine.impl.bpmn.behavior.ParallelGatewayBehavior;
import org.foxbpm.engine.impl.util.StringUtil;
import org.foxbpm.model.BaseElement;
import org.foxbpm.model.ParallelGateway;

public class ParallelGatewayParser extends GatewayParser {

	 
	public BaseElementBehavior parser(BaseElement baseElement) {
		ParallelGatewayBehavior parallelGatewayBehavior=(ParallelGatewayBehavior)baseElementBehavior;
		ParallelGateway parallelGateway=(ParallelGateway)baseElement;
		String convergType=parallelGateway.getConvergType();
		if(StringUtil.isNotEmpty(convergType)){
			parallelGatewayBehavior.setConvergType(convergType);
		}
		return super.parser(baseElement);
	}
	 
	public void init() {
		baseElementBehavior=new ParallelGatewayBehavior();
	}


}
